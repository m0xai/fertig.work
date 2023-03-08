package work.fertig.backend.todo;

import java.sql.Timestamp;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "todo")
public class Todo {
  @Column(name = "id")
  private @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;

  @Column(name = "name", nullable = false)
  private String name;
  @Column(name = "description", nullable = false)
  private String description;
  @Column(name = "is_done")
  private Boolean isDone;
  @Column(name = "is_draft")
  private Boolean isDraft;
  @Column(name = "created_at")
  @CreationTimestamp
  private Timestamp createdAt;

  @Column(name = "updated_at")
  @UpdateTimestamp
  private Timestamp updatedAt;

  public Todo() {
  }

  public Todo(String name, String description) {
    this.name = name;
    this.description = description;
    this.isDone = false;
    this.isDraft = false;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getIsDone() {
    return isDone;
  }

  public void setIsDone(Boolean isDone) {
    this.isDone = isDone;
  }

  public Boolean getIsDraft() {
    return isDraft;
  }

  public void setIsDraft(Boolean isDraft) {
    this.isDraft = isDraft;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public Timestamp getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }

    if (!(obj instanceof Todo)) {
      return false;
    }

    Todo tmp = (Todo) obj;
    return Objects.equals(this.name, tmp.name) && Objects.equals(this.description, tmp.description)
        && Objects.equals(this.isDone, tmp.isDone) && Objects.equals(this.isDraft, tmp.isDraft);
  }

  @Override
  public String toString() {
    return "Todo {id=" + this.id + ", name=" + this.name + ")";
  }
}
