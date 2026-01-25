export const MOCK_RENTAL_MACHINES = [
  {
    id: '1',
    name: 'Tractor 5050D',
    type: 'Tractor', // guessing field names for prefill later
    brand: 'John Deere',
    model: '5050D',
    price: '500',
    period: 'Day',
    expiry: '15 Nov 2024',
    status: 'Live',
    visible: true,
    expired: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAc5bpin8zkfJcQzluNqZmWKPPhkmGpGw7fs3xJx1bwxY9KYqATVSHCOJu_nhaH0ogx53SaU_YcLhGQdRuQns6yOc1YUlbZccA-0VLqR5B963MoxVuQHW3c8_mig7YjOF_6uTsI7gLGI4s4_t8mM7CzeJJ3RAr4lxvBsEcV8BySU-tCV5y8p2TMQMAx1Zey3UfgrJojKj3hzgpZlYIL5SgNMQ-kBpAnXFirw3NpG_puMb_SDg9UFX-Mrw-KR4ICvEhOHEpPfj8yDJ6S',
    // Extra fields for form prefill (matching likely schema of add-machine)
    year: '2021',
    hp: '50',
  },
  {
    id: '2',
    name: 'Power Tiller 15HP',
    type: 'Tiller',
    brand: 'VKY',
    model: '15HP',
    price: '350',
    period: 'Day',
    expiry: '01 Oct 2024',
    status: 'Expired',
    visible: false,
    expired: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKBwp1b17cad9tOfmPavy2YZgANHYh26OmJp8sSFAW1HZ9ZpdknMXtYnhSeRgVRw0hVZihzONUMcQVTNskTKuRzj_kkYf6CiSt39OGHtiE3VHJVL5C2BoA94Viv8saOs6frU3Sn5VD93Zl-CjGCqeEelJHOnTe6PqzToK_hGR1M1WqeEKdqeIDfs9I0-YBirQFT4bxNUUYYtgcxi94JSpj4wQSZrNaQqUyOI8XLjCQVXrdfwixGaDh1tx4iSuQY-PMx10qy9seDLG',
    year: '2019',
    hp: '15',
  },
  {
    id: '3',
    name: 'Paddy Harvester',
    type: 'Harvester',
    brand: 'Kubota',
    model: 'DC-68G',
    price: '1200',
    period: 'Day',
    expiry: '20 Dec 2024',
    status: 'Live',
    visible: true,
    expired: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7L5dnb736V9C3rhDoCdLb7hiHEcTKLUrqolv7iHLyt5owoh6eNh2s1ZQ4ONORt5sIgtgQteaL2o5tq2VsDam0KP9qbaRdxYRiftRdieP9H-bg1fwLQxZ2mnLXtB8x6Mb5SVrwW3TedSFkhaN55fE8mo2ojaw9kNlWFMqjKEDc9Z6VVBxROVACHJSmeQW30uX9WmS0gJZRFXC0_r99JB-A7gfU6QY7nOEw0QnQDfFg3zp-HFtFYYBsvZyCR5Qv4a_HpeiuqCAR-9Er',
    year: '2022',
    hp: '68',
  },
];
