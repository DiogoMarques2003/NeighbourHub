import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://neighbourhub.diogomarques.dev/api/condominium/:condominiumId/commonarea', () => {

    const data = [
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332cd",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63oHjd3XI27dYwBrx8uTdnxIqm-LakglpZQ&s"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332cg",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332ce",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332ch",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332xd",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4263-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-434-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4484-9e8b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-3384-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a995-da3a-4484-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b029a99b-da3a-4484-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4485-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },
    {
        id: "b069a99b-da3a-4384-9e7b-c6a88a4332cf",
        name: "Campo Paddle",
        startSchedule: "10:00",
        endSchedule: "20:00",
        cost: 10,
        rules: "Não andar á batatada\nAssumir que perderam",
        status: "READY",
        capacity: 4,
        images: [
            "https://neighbourhub.diogomarques.dev/content/files\\commonAreasPictures\\fdf7b5dc-9b26-4a04-861b-836b3eba9a72.jpg"
        ],
        type: 1,
        createdAT: "2025-03-25T22:40:58.734Z",
        condominiumId: "e79be612-b2e9-4eb4-8bb3-f6759184a39f"
    },

    ];

    const mockData = {
        data: data.slice(0,data.length/2),
        pages: 2,
        actualPage: 1,
        nRecords: data.length
      };

      return HttpResponse.json(mockData);
  }),
];