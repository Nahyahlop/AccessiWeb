from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Text, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    username: Mapped[str] = mapped_column(String(80), nullable=True)

    audits: Mapped[list["Audit"]] = relationship(
        "Audit",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }


class Audit(db.Model):
    __tablename__ = "audits"

    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="completed")
    summary: Mapped[str] = mapped_column(Text, nullable=True)
    issues: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[str] = mapped_column(String(50), default=lambda: datetime.utcnow().isoformat())

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="audits")

    def serialize(self):
        return {
            "id": self.id,
            "url": self.url,
            "score": self.score,
            "status": self.status,
            "summary": self.summary,
            "issues": self.issues,
            "created_at": self.created_at,
            "user_id": self.user_id
        }