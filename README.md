# RocketSeat Explorer Stage 8 NodeApp


## ER Diagram 
```mermaid
erDiagram
    users ||--o{ movie_notes : ""
    users {
        int id PK
        string name
        string email
        string password
        string avatar
        date created_at
        date updated_at
    }
    movie_notes ||--|{ movie_tags : ""
    movie_notes {
        int id PK
        string title
        string description
        int rating
        int user_id FK
        date created_at
        date updated_at
    }
    movie_tags {
        int ID PK
        string name
        int note_id FK
        int user_id FK
    }
```