from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base, TimestampMixin, gen_uuid


class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    name: Mapped[str] = mapped_column(String(255))
    raw_input: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(50), default="processing")

    understanding: Mapped[str | None] = mapped_column(Text, nullable=True)
    dev_plan: Mapped[str | None] = mapped_column(Text, nullable=True)
    design_plan: Mapped[str | None] = mapped_column(Text, nullable=True)
    task_graph: Mapped[str | None] = mapped_column(Text, nullable=True)
    control_layer: Mapped[str | None] = mapped_column(Text, nullable=True)
