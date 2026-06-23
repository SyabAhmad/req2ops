import { txt, map, List, Section, ComponentStates, FlowSteps, ObjectList, FlowPath } from '../../utils/safe'

export default function DesignView({ data }) {
  if (!data) return <EmptyState />
  return (
    <div className="space-y-8 py-6">
      {data.design_philosophy && (
        <Section title="Design Philosophy">
          <p className="text-sm leading-relaxed text-gray-600">{txt(data.design_philosophy)}</p>
        </Section>
      )}

      <Section title="Screens">
        <div className="space-y-3">
          {map(data.screens, (s, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(s.name)}</p>
              {s.purpose && <p className="mt-0.5 text-xs text-gray-400 italic">{txt(s.purpose)}</p>}
              {s.description && <p className="mt-1 text-xs text-gray-600">{txt(s.description)}</p>}
              {map(s.states, (st, j) => (
                <div key={j} className="mt-2 space-y-1">
                  <div className="rounded bg-gray-50 px-3 py-1.5">
                    <span className={`text-[10px] font-semibold uppercase px-1 py-0.5 rounded ${
                      st.state === 'loading' ? 'bg-blue-50 text-blue-600' :
                      st.state === 'empty' ? 'bg-amber-50 text-amber-600' :
                      st.state === 'error' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                    }`}>{txt(st.state)}</span>
                    <p className="mt-0.5 text-xs text-gray-500">{txt(st.description)}</p>
                    {st.ui_behavior && <p className="text-xs text-gray-400 italic">{txt(st.ui_behavior)}</p>}
                  </div>
                </div>
              ))}
              {map(s.key_interactions, (k, j) => (
                <div key={j} className="mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Key Interactions</p>
                  <ul className="space-y-0.5">
                    <li className="flex items-start gap-1.5 text-xs text-gray-500">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                      {txt(k)}
                    </li>
                  </ul>
                </div>
              ))}
              <div className="mt-2 flex flex-wrap gap-2">
                {s.responsive_behavior && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Responsive: {txt(s.responsive_behavior)}</span>}
                {s.accessibility_notes && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">a11y: {txt(s.accessibility_notes)}</span>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Design System Components">
        <div className="space-y-2">
          {map(data.design_system_components, (c, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
              <p className="text-sm font-medium text-gray-900">{txt(c.name)}</p>
              {c.usage && <p className="text-xs text-gray-500">{txt(c.usage)}</p>}
              <ComponentStates items={c.states} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="User Flows">
        <div className="space-y-3">
          {map(data.user_flows, (f, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{txt(f.flow_name)}</p>
              {f.entry_point && <p className="text-xs text-gray-400 mt-0.5">Entry: {txt(f.entry_point)}</p>}
              <FlowSteps items={f.steps} />
              <div className="mt-2 space-y-3">
                <FlowPath items={f.success_path} label="Success Path" />
                <FlowPath items={f.error_path} label="Error Path" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="UX Notes">
        <List items={data.ux_notes} />
      </Section>

      <Section title="Responsive Breakpoints">
        <ObjectList items={data.responsive_breakpoints} keyField="breakpoint" fields={['description']} />
      </Section>

      <Section title="Accessibility Requirements">
        <ObjectList items={data.accessibility_requirements} keyField="requirement" fields={['level', 'enabled']} />
      </Section>

      <Section title="Animation & Motion">
        <List items={data.animation_and_motion} />
      </Section>

      <Section title="Error & Empty States">
        <List items={data.error_and_empty_states} />
      </Section>

      <Section title="Loading & Transition States">
        <List items={data.loading_and_transition_states} />
      </Section>
    </div>
  )
}

function EmptyState() {
  return <div className="flex items-center justify-center py-16"><p className="text-sm text-gray-400">No design plan yet.</p></div>
}
