# NeighbourHub – Simplifying Condominium Life

## 📋 Project Overview

**NeighbourHub** is a modern and intuitive web platform designed to streamline condominium management. It addresses common issues such as disorganization, communication breakdowns, and administrative inefficiencies by centralizing all essential operations in one place.

With a user-friendly interface, the platform enables residents and administrators to manage maintenance requests, book shared spaces, offer community services, and participate in decision-making through digital voting. NeighbourHub enhances transparency, boosts efficiency, and fosters collaboration within the residential community.

---

## 🛠 Key Features

### 1. Request Management
- Residents can submit maintenance or improvement requests.
- Administrators evaluate requests, provide budgets, and initiate community votes.
- Requests are tracked in real time, including progress updates and final cost reports.

### 2. Shared Space Booking
- Residents can browse and reserve common areas such as party rooms, barbecue spaces, and garages.
- Automatic availability checks and display of space rules.
- Reservations require admin approval; fines may be applied for rule violations.

### 3. Community Services
- Residents can offer services (e.g., tutoring, repairs) to others within the condominium.
- Listings include descriptions, pricing, and contact information.
- Services can be booked and reviewed directly through the platform.

### 4. Digital Voting
- Admins can create proposals and initiate votes.
- Household representatives vote digitally.
- Transparent display of results for all participants.

### 5. Condominium Management
- Admins can register, edit, or remove residents from the system.
- Access to rules, fees, budgets, and administrator information.
- Payment tracking for fees, fines, and reservations.

---

## 🎯 Project Objectives

1. **Digitize Management:** Replace manual workflows with a centralized digital system.
2. **Increase Resident Engagement:** Encourage participation in community decisions.
3. **Ensure Transparency:** Provide clear access to budgets, votes, and operations.
4. **Reduce Overhead:** Minimize paperwork and admin workload.
5. **Support Scalability:** Adaptable to various condominium sizes and types.

---

## 💻 Technologies Used

- **Frontend:**  
  Built with **React** and bundled using **Vite** for fast build times and modern development features.  
  Styled using **TailwindCSS**, offering a responsive and utility-first design approach.

- **Backend:**  
  Developed with **Node.js** and **Express**, applying **SOLID principles** for modular, scalable, and maintainable architecture.  
  Uses **Prisma.io** as an ORM for type-safe and efficient database access.

- **Database:**  
  Powered by **PostgreSQL**, a robust relational database system with advanced transaction support and data integrity.

- **Authentication & Security:**  
  Utilizes **JWT (JSON Web Tokens)** for secure and scalable user authentication.  
  Role-based access control with middleware to protect routes and enforce permissions.  
  Sensitive data is encrypted following security best practices.

- **Design & Prototyping:**  
  Interfaces were designed based on high-fidelity **mockups**, focusing on accessibility and user experience across all user roles.

- **Development Methodology:**  
  Followed an **Agile approach** with short **sprints**, continuous integration, and regular stakeholder feedback.

---

## 📈 Results and Impact

- Significant reduction in admin calls due to centralized request and communication handling.
- Faster resolution of maintenance tasks with full transparency.
- Efficient, conflict-free booking of shared spaces.
- Active engagement through digital voting and internal community services.
- Improved administrative workflows and user satisfaction.

---

## 🏗 Technical Architecture

NeighbourHub follows a clean and modular architecture:
- **Core Entities:** Users, Condominiums, Shared Spaces, Requests, Services, Budgets, Votes.
- **Data Layer:** Managed by **Prisma ORM**, modeling entity relationships and enforcing schema consistency.
- **API Layer:** RESTful API built with **Express**, structured by responsibility and service.
- **Authentication Layer:** Middleware-based route protection using **JWT** authentication.

---

## 📚 References

- [React Documentation](https://reactjs.org)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Express Documentation](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io)
- [PostgreSQL Documentation](https://www.postgresql.org)
- [JWT Introduction](https://jwt.io/introduction/)
