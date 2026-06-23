from typing import Optional, TypedDict, AsyncGenerator, List
from langgraph.graph import StateGraph
from app.engine.crew.agents import build_llm
from app.schemas.understanding import Understanding
from app.schemas.dev_plan import DevPlan
from app.schemas.design_plan import DesignPlan
from app.schemas.task_graph import TaskGraph
from app.schemas.control_layer import ControlLayer
from pydantic import BaseModel

AGENTS_META = [
    ("understanding", "Understanding Requirements", "Senior Requirements Analyst"),
    ("classifier", "Plan Classifier", "Planning Classifier"),
    ("dev_breakdown", "Dev Architecture", "Senior Software Architect"),
    ("design_breakdown", "Design Planning", "Senior UI/UX Designer"),
    ("task_graph", "Task Breakdown", "Technical Project Manager"),
    ("control_layer", "Delivery Review", "Delivery Lead"),
]

UNDERSTANDING_PROMPT = """You are a Senior Requirements Analyst. Your job is to parse raw client input and produce a precise, structured understanding of what they need.

REQUIREMENTS:
- Extract the ONE clear project goal. If the input is vague, state exactly what is unclear in missing_information.
- For target_users and key_stakeholders: be specific. Not "users" but "fleet dispatchers at logistics companies managing 50+ drivers".
- implicit_requirements must capture what they implied but didn't state (e.g. "needs to be fast" implies a performance requirement).
- missing_information must list critical gaps that would block development (e.g. "no mention of authentication method").
- assumptions must be explicit about what you're assuming to fill gaps (e.g. "assuming JWT-based auth since no auth method specified").
- business_constraints: budget, timeline, team size, compliance, platform limitations mentioned or implied.
- success_criteria: how would the client know this project succeeded? Be concrete.
- scope_boundaries: what is explicitly IN scope and what is OUT of scope.

BAD output (generic, useless):
  project_goal: "Build a fleet management system"
  target_users: ["drivers", "admins"]
  missing_information: ["more details needed"]

GOOD output (specific, actionable):
  project_goal: "Build a real-time fleet dispatch system that optimizes route assignments for 500+ delivery drivers across 3 regional hubs"
  target_users: ["Fleet dispatchers at mid-sized logistics companies", "Delivery drivers using mobile app for route navigation", "Regional operations managers reviewing fleet utilization"]
  missing_information: ["No mention of real-time GPS integration provider", "Unclear whether driver mobile app should support offline mode", "No specified SLA for dispatch response times"]
  assumptions: ["Assuming Google Maps or Mapbox for routing since no provider specified", "Assuming drivers have smartphones with constant data connectivity", "Assuming existing backend is Node.js based on job description references"]
  risk_areas: ["Real-time location tracking at 500+ concurrent users may exceed budget GPS API tiers", "Driver adoption of mobile app if UI is not intuitive"]

Produce EXCELLENT output. Be specific. Be concrete. Every field must have substance. Output must be a single valid json object (NOT an array)."""

DEV_PROMPT = """You are a Senior Software Architect. Based on the requirements analysis, design a complete, production-ready system architecture.

GUIDELINES:
- system_architecture: A paragraph describing the overall architecture (microservices, monolith, event-driven, etc.) and WHY this pattern suits the project.
- architecture_diagram_description: Describe the system as a diagram would show it — components, connections, data flow direction.
- tech_stack: A dict with categories like "backend_language", "framework", "database", "cache", "message_queue", "cloud_provider", "ci_cd". Justify each choice briefly in the value.
- apis: Realistic REST/gRPC endpoints with actual paths (e.g. /api/v1/dispatch/routes/optimize), not generic placeholders.
- data_flows: Each flow must have a source, destination, protocol (HTTP, WebSocket, gRPC, Kafka), and data format (JSON, Protobuf, Avro).
- architecture_decisions: For every significant design choice, list options considered, rationale for the chosen option, and trade-offs accepted.
- deployment_strategy: Concrete hosting, containerization, CI/CD pipeline stages, environments, and scaling rules (e.g. "auto-scale based on CPU > 70% or queue depth > 1000").
- security_measures: Authentication, authorization, encryption (in-transit and at-rest), API rate limiting, input validation, secrets management.
- testing_strategy: Unit, integration, E2E, performance/load testing approach. Mention specific tools.
- monitoring_and_observability: Logging aggregation, metrics collection, distributed tracing, alerting rules, dashboards.
- performance_considerations: Expected latency budgets, throughput targets, caching strategy, database indexing approach, connection pooling.
- error_handling_strategy: Retry policies, circuit breakers, dead-letter queues, graceful degradation, fallback mechanisms.

BAD output (generic, useless):
  system_architecture: "Microservices architecture"
  backend_modules: ["api", "worker", "db"]
  apis: [{"method": "POST", "path": "/api/create", "description": "creates something"}]

GOOD output (specific, actionable):
  system_architecture: "Event-driven microservices architecture using Apache Kafka as the backbone. Dispatch Service, Driver Service, and Optimization Engine communicate asynchronously via Kafka topics. API Gateway handles auth and request routing. This pattern was chosen because fleet dispatch requires real-time event processing and loose coupling between services."
  tech_stack: {"backend_language": "Go 1.22 — optimal for high-concurrency dispatch calculations", "framework": "Fiber (Go) for REST APIs", "database": "PostgreSQL 16 + TimescaleDB for time-series driver location data", "message_queue": "Apache Kafka for dispatch events and driver updates", "cache": "Redis 7 for real-time driver status and route caches", "cloud_provider": "AWS (EKS for Kubernetes, RDS for PostgreSQL, MSK for Kafka)"}
  apis: [{"method": "POST", "path": "/api/v1/dispatch/optimize", "description": "Submit optimization request with orders and available drivers, returns optimized route assignments"}, {"method": "GET", "path": "/api/v1/drivers/{id}/status", "description": "Get real-time driver status including location, current route, and availability"}]

Produce EXCELLENT output. Every field must have concrete, project-specific detail, not generic boilerplate. Output must be a single valid json object (NOT an array)."""

DESIGN_PROMPT = """You are a Senior UI/UX Designer. Based on the requirements analysis, design a complete, detailed user experience and interface.

GUIDELINES:
- design_philosophy: The overarching design principle (e.g. "mobile-first, focused on reducing dispatcher cognitive load").
- screens: Each screen must have a clear purpose, specific states (loading, empty, error, edge cases), key interactions described as user actions, responsive behavior (how it adapts mobile/tablet/desktop), and accessibility notes.
- user_flows: Each flow must have an entry point, success path with numbered steps, error path, and alternative paths. Think through what happens when something goes wrong.
- design_system_components: For each component, list its states (default, hover, active, disabled, error, loading).
- responsive_breakpoints: Specific breakpoints and what changes at each.
- accessibility_requirements: WCAG compliance level, keyboard navigation, screen reader support, color contrast ratios, focus indicators.
- animation_and_motion: Specific transitions, loading animations, micro-interactions with purpose (not just decoration).
- error_and_empty_states: What each empty state looks like and what action the user can take.
- loading_and_transition_states: Skeleton screens, progress indicators, optimistic UI updates.

BAD output (generic, useless):
  screens: [{"name": "Dashboard", "description": "Main dashboard screen"}]
  user_flows: [{"flow_name": "Create order", "steps": ["Fill form", "Submit"]}]

GOOD output (specific, actionable):
  screens: [{"name": "Dispatch Dashboard", "description": "Real-time map view showing all active drivers, pending dispatch requests, and fleet status summary", "purpose": "Give dispatchers at-a-glance awareness of fleet status and quick access to dispatch actions", "states": [{"state": "loading", "description": "Skeleton map placeholder with pulsing driver marker outlines", "ui_behavior": "Show 8 ghost driver markers with shimmer animation, loading spinner in status panel"}, {"state": "empty", "description": "No drivers online or no dispatch requests", "ui_behavior": "Show illustration of parked vehicles with CTA 'Add your first driver' or 'Configure fleet hours'"}, {"state": "error", "description": "GPS feed disconnected or API unavailable", "ui_behavior": "Show banner: 'Live tracking unavailable — showing last known positions. Retry in 30s...' with manual retry button"}], "key_interactions": ["Click driver marker to show mini profile card with status, route, next stop", "Drag-select area on map to filter visible drivers", "Right-click on map to create instant dispatch request at that location"], "responsive_behavior": "Desktop: full map with side panel. Tablet: stacked layout with collapsible panel. Mobile: full-screen map with bottom sheet for details", "accessibility_notes": "All map interactions have keyboard alternatives. Color-coded driver status also uses icons and text labels for color-blind users. Focus trap in modals."}}]

Produce EXCELLENT output. Be specific. Think through every state the user might encounter. Output must be a single valid json object (NOT an array)."""

TASK_PROMPT = """You are a Technical Project Manager. Based on the full analysis (understanding + dev plan + design plan), break the project into an executable plan with phases, milestones, and detailed tasks.

GUIDELINES:
- project_phases: Logical groupings of work (e.g. "Foundation & Infrastructure", "Core Features", "Optimization & Polish"). Each phase has an estimated sprint count and references specific task IDs.
- milestones: Significant checkpoints with concrete deliverables. Each milestone must have a target date estimate and clear dependencies.
- tasks: Each task must have acceptance criteria written as GIVEN/WHEN/THEN scenarios, a specific deliverable, a definition of done checklist, effort breakdown by role (e.g. "backend: 3d, frontend: 2d, devops: 1d"), and estimated effort in person-days or hours.
- critical_path: The sequence of tasks that determines the minimum project duration. List their IDs.
- parallel_tracks: Which work streams can happen simultaneously (e.g. "Mobile app and admin dashboard can be built in parallel once API contracts are defined").
- P0 = Critical path, blocks everything else if delayed. P1 = Important but has workarounds. P2 = Enhancement, can be deferred.

ACCEPTANCE CRITERIA format:
  - given: "User is logged in as a dispatcher"
  - when: "They select 3 available drivers and click 'Optimize Route'"
  - then: "System assigns each driver to the nearest pending pickup with ETA displayed"

BAD output (generic, useless):
  tasks: [{"id": "TASK-001", "title": "Build API", "description": "Build the API", "priority": "P0"}]

GOOD output (specific, actionable):
  tasks: [{"id": "TASK-001", "title": "Implement dispatch optimization endpoint", "description": "Build POST /api/v1/dispatch/optimize that accepts order batch and available driver list, runs nearest-neighbor assignment algorithm, returns optimized route assignments with ETAs", "acceptance_criteria": [{"given": "A dispatch request with 10 pending orders and 5 available drivers", "when": "The optimization endpoint is called", "then": "System returns 5 route assignments within 2 seconds, each driver assigned to 2 orders sorted by geographic proximity"}], "priority": "P0", "estimated_effort": "5d", "effort_breakdown": {"backend": "4d", "devops": "1d"}, "dependencies": ["TASK-000"], "assignee_role": "backend", "deliverable": "Optimized dispatch API endpoint with Swagger documentation", "definition_of_done": ["All acceptance criteria pass", "API returns correct status codes for all edge cases (no drivers available, no orders, all drivers busy)", "Response time under 2s for 50 orders + 25 drivers load test", "Swagger docs published and render correctly", "Unit tests cover optimization logic with 90%+ coverage"]}]

Produce EXCELLENT output. Every task must be independently executable, have clear completion criteria, and be traceable back to the requirements. Output must be a single valid json object (NOT an array)."""

CONTROL_PROMPT = """You are a Delivery Lead performing a final review of the complete execution plan. Your job is to identify gaps, risks, decisions, and next actions so the team can start with confidence.

GUIDELINES:
- missing_info: Specific questions that need client answers before development can proceed. Not generic "need more info" but "Do drivers need offline mode for the mobile app, or is constant connectivity acceptable?"
- risks: Each risk must have severity (how bad if it happens), likelihood (probability 1-5), impact (what would be affected), a concrete mitigation strategy (what to do to reduce likelihood), a contingency plan (what to do if it happens anyway), and an owner.
- next_actions: Immediate steps to unblock work. Each must have priority, estimated effort, and dependencies. Actions should be assigned to specific roles/persons.
- decisions: Every decision logged with context (what prompted it), options considered, chosen option, rationale, and status (proposed / accepted / rejected / superseded).
- blocked_items: Specific tasks or deliverables that cannot start yet.
- blocked_item_unblockers: Exactly what needs to happen to unblock each blocked item.
- follow_up_triggers: Conditions that require re-engagement with client/stakeholders.
- communication_plan: Who needs to know what, via which channel, at what frequency.
- escalation_paths: What happens if a risk materializes or a blocker persists — who gets notified at each level.
- timeline_impacts: How delays or gaps affect the overall delivery date.
- assumptions_to_validate: Specific assumptions from earlier steps that need to be confirmed or rejected before they cause problems.

BAD output (generic, useless):
  risks: [{"description": "Risk of delay", "severity": "high"}]
  next_actions: [{"action": "Get requirements", "owner": "PM"}]

GOOD output (specific, actionable):
  risks: [{"description": "GPS API cost overrun — real-time tracking for 500+ concurrent drivers may exceed the budgeted Google Maps API tier", "severity": "high", "likelihood": "4", "impact": "Monthly infrastructure cost could increase 3x, potentially exceeding project budget", "mitigation": "Evaluate Mapbox and OpenStreetMap as alternatives in week 1. Implement caching layer to reduce API calls.", "contingency": "Switch to on-device GPS with batched sync (30s intervals) instead of real-time streaming. Accept 30s location latency.", "owner": "Backend lead"}, {"description": "Driver mobile app adoption risk — drivers may reject the app if UI is confusing or battery drain is high", "severity": "medium", "likelihood": "3", "impact": "Low adoption means manual dispatch overhead, defeating the purpose of the system", "mitigation": "Include driver representatives in UX testing. Optimize for battery with background location batching.", "contingency": "Build a lightweight SMS-based dispatch fallback for drivers who refuse the app", "owner": "Product Manager"}]
  next_actions: [{"action": "Confirm GPS provider and budget with client — prepare comparison sheet for Google Maps vs Mapbox vs OSM before meeting", "owner": "Project Manager", "reason": "Architecture decisions for routing and real-time tracking depend on this choice", "priority": "P0", "estimated_effort": "4h", "depends_on": ["TASK-000"]}]

Produce EXCELLENT output. Be thorough. A good delivery review should uncover issues that would otherwise surface mid-sprint. Output must be a single valid json object (NOT an array)."""

CLASSIFIER_PROMPT = """You are a Planning Classifier. Based on the requirements analysis, determine which downstream plans are needed.

RULES:
- needs_dev: true if the project requires software architecture, APIs, database, backend services, infrastructure
- needs_design: true if the project requires UI/UX design, screens, user flows, design system, accessibility
- needs_tasks: true if the project needs a task breakdown with phases, milestones, detailed tasks (usually if dev OR design is true)
- needs_control: true if the project needs risk analysis, decisions log, next actions, delivery review (usually if tasks is true)

EXAMPLES:
- Design-only request (branding, marketing assets, UI mockups): needs_dev=false, needs_design=true, needs_tasks=false, needs_control=false
- Backend API request (microservices, database, auth): needs_dev=true, needs_design=false, needs_tasks=true, needs_control=true
- Full product build (app with frontend + backend): needs_dev=true, needs_design=true, needs_tasks=true, needs_control=true
- Technical spec only: needs_dev=true, needs_design=false, needs_tasks=true, needs_control=true

Output a single valid json object with: needs_dev, needs_design, needs_tasks, needs_control, reasoning."""


class PlanType(BaseModel):
    needs_dev: bool
    needs_design: bool
    needs_tasks: bool
    needs_control: bool
    reasoning: str


class PipelineState(TypedDict):
    input: str
    understanding: Optional[Understanding]
    plan_type: Optional[PlanType]
    dev_plan: Optional[DevPlan]
    design_plan: Optional[DesignPlan]
    task_graph: Optional[TaskGraph]
    control_layer: Optional[ControlLayer]


def _context(state: PipelineState) -> dict:
    ctx = {}
    for k in ("understanding", "dev_plan", "design_plan", "task_graph", "control_layer"):
        v = state.get(k)
        if v is not None:
            ctx[k] = v.model_dump_json(indent=2) if hasattr(v, "model_dump_json") else str(v)
    return ctx


def _serialize(obj):
    if obj is None:
        return None
    if hasattr(obj, "model_dump"):
        return obj.model_dump()
    return obj


async def run_pipeline(cleaned_input: str) -> dict:
    llm = build_llm()
    understanding_chain = llm.with_structured_output(Understanding, method="json_mode")
    dev_chain = llm.with_structured_output(DevPlan, method="json_mode")
    design_chain = llm.with_structured_output(DesignPlan, method="json_mode")
    task_chain = llm.with_structured_output(TaskGraph, method="json_mode")
    control_chain = llm.with_structured_output(ControlLayer, method="json_mode")
    classifier_chain = llm.with_structured_output(PlanType, method="json_mode")

    state: PipelineState = {
        "input": cleaned_input,
        "understanding": None,
        "plan_type": None,
        "dev_plan": None,
        "design_plan": None,
        "task_graph": None,
        "control_layer": None,
    }

    state["understanding"] = await understanding_chain.ainvoke([
        ("system", UNDERSTANDING_PROMPT),
        ("human", cleaned_input),
    ])

    state["plan_type"] = await classifier_chain.ainvoke([
        ("system", CLASSIFIER_PROMPT),
        ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
    ])

    if state["plan_type"].needs_dev:
        state["dev_plan"] = await dev_chain.ainvoke([
            ("system", DEV_PROMPT),
            ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
        ])

    if state["plan_type"].needs_design:
        state["design_plan"] = await design_chain.ainvoke([
            ("system", DESIGN_PROMPT),
            ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
        ])

    if state["plan_type"].needs_tasks:
        ctx = _context(state)
        combined = (
            f"Understanding:\n{ctx['understanding']}\n\n"
            f"Dev Plan:\n{ctx.get('dev_plan') or 'N/A'}\n\n"
            f"Design Plan:\n{ctx.get('design_plan') or 'N/A'}\n\n"
            f"Original:\n{cleaned_input}"
        )
        state["task_graph"] = await task_chain.ainvoke([
            ("system", TASK_PROMPT),
            ("human", combined),
        ])

    if state["plan_type"].needs_control:
        ctx = _context(state)
        final_combined = (
            f"Understanding:\n{ctx['understanding']}\n\n"
            f"Dev Plan:\n{ctx.get('dev_plan') or 'N/A'}\n\n"
            f"Design Plan:\n{ctx.get('design_plan') or 'N/A'}\n\n"
            f"Task Graph:\n{ctx.get('task_graph') or 'N/A'}\n\n"
            f"Original:\n{cleaned_input}"
        )
        state["control_layer"] = await control_chain.ainvoke([
            ("system", CONTROL_PROMPT),
            ("human", final_combined),
        ])

    return {
        "understanding": _serialize(state.get("understanding")),
        "plan_type": _serialize(state.get("plan_type")),
        "dev_plan": _serialize(state.get("dev_plan")),
        "design_plan": _serialize(state.get("design_plan")),
        "task_graph": _serialize(state.get("task_graph")),
        "control_layer": _serialize(state.get("control_layer")),
    }


async def stream_pipeline(cleaned_input: str) -> AsyncGenerator[dict, None]:
    llm = build_llm()
    understanding_chain = llm.with_structured_output(Understanding, method="json_mode")
    dev_chain = llm.with_structured_output(DevPlan, method="json_mode")
    design_chain = llm.with_structured_output(DesignPlan, method="json_mode")
    task_chain = llm.with_structured_output(TaskGraph, method="json_mode")
    control_chain = llm.with_structured_output(ControlLayer, method="json_mode")
    classifier_chain = llm.with_structured_output(PlanType, method="json_mode")

    state: PipelineState = {
        "input": cleaned_input,
        "understanding": None,
        "plan_type": None,
        "dev_plan": None,
        "design_plan": None,
        "task_graph": None,
        "control_layer": None,
    }

    yield {"event": "agent_start", "agent": "understanding"}
    state["understanding"] = await understanding_chain.ainvoke([
        ("system", UNDERSTANDING_PROMPT),
        ("human", cleaned_input),
    ])
    yield {"event": "agent_complete", "agent": "understanding"}

    yield {"event": "agent_start", "agent": "classifier"}
    state["plan_type"] = await classifier_chain.ainvoke([
        ("system", CLASSIFIER_PROMPT),
        ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
    ])
    yield {"event": "agent_complete", "agent": "classifier"}

    if state["plan_type"].needs_dev:
        yield {"event": "agent_start", "agent": "dev_breakdown"}
        state["dev_plan"] = await dev_chain.ainvoke([
            ("system", DEV_PROMPT),
            ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
        ])
        yield {"event": "agent_complete", "agent": "dev_breakdown"}

    if state["plan_type"].needs_design:
        yield {"event": "agent_start", "agent": "design_breakdown"}
        state["design_plan"] = await design_chain.ainvoke([
            ("system", DESIGN_PROMPT),
            ("human", f"Requirements Analysis:\n{_context(state)['understanding']}\n\nOriginal:\n{cleaned_input}"),
        ])
        yield {"event": "agent_complete", "agent": "design_breakdown"}

    if state["plan_type"].needs_tasks:
        yield {"event": "agent_start", "agent": "task_graph"}
        ctx = _context(state)
        combined = (
            f"Understanding:\n{ctx['understanding']}\n\n"
            f"Dev Plan:\n{ctx.get('dev_plan') or 'N/A'}\n\n"
            f"Design Plan:\n{ctx.get('design_plan') or 'N/A'}\n\n"
            f"Original:\n{cleaned_input}"
        )
        state["task_graph"] = await task_chain.ainvoke([
            ("system", TASK_PROMPT),
            ("human", combined),
        ])
        yield {"event": "agent_complete", "agent": "task_graph"}

    if state["plan_type"].needs_control:
        yield {"event": "agent_start", "agent": "control_layer"}
        ctx = _context(state)
        final_combined = (
            f"Understanding:\n{ctx['understanding']}\n\n"
            f"Dev Plan:\n{ctx.get('dev_plan') or 'N/A'}\n\n"
            f"Design Plan:\n{ctx.get('design_plan') or 'N/A'}\n\n"
            f"Task Graph:\n{ctx.get('task_graph') or 'N/A'}\n\n"
            f"Original:\n{cleaned_input}"
        )
        state["control_layer"] = await control_chain.ainvoke([
            ("system", CONTROL_PROMPT),
            ("human", final_combined),
        ])
        yield {"event": "agent_complete", "agent": "control_layer"}

    yield {
        "event": "complete",
        "workspace": {
            "understanding": _serialize(state.get("understanding")),
            "plan_type": _serialize(state.get("plan_type")),
            "dev_plan": _serialize(state.get("dev_plan")),
            "design_plan": _serialize(state.get("design_plan")),
            "task_graph": _serialize(state.get("task_graph")),
            "control_layer": _serialize(state.get("control_layer")),
        },
    }
