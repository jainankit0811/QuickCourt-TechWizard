export const statsData = {
    totalUsers: 15420,
    facilityOwners: 342,
    bookings: 8750,
    activeCourts: 1250,
};

export const chartData = {
    bookingActivity: [
        { month: 'Jan', bookings: 650 },
        { month: 'Feb', bookings: 720 },
        { month: 'Mar', bookings: 680 },
        { month: 'Apr', bookings: 850 },
        { month: 'May', bookings: 920 },
        { month: 'Jun', bookings: 1100 },
        { month: 'Jul', bookings: 1250 },
        { month: 'Aug', bookings: 1180 },
        { month: 'Sep', bookings: 1050 },
        { month: 'Oct', bookings: 980 },
        { month: 'Nov', bookings: 890 },
        { month: 'Dec', bookings: 750 },
    ],

    userRegistration: [
        { month: 'Jan', users: 120 },
        { month: 'Feb', users: 150 },
        { month: 'Mar', users: 180 },
        { month: 'Apr', users: 220 },
        { month: 'May', users: 280 },
        { month: 'Jun', users: 350 },
        { month: 'Jul', users: 420 },
        { month: 'Aug', users: 380 },
        { month: 'Sep', users: 320 },
        { month: 'Oct', users: 290 },
        { month: 'Nov', users: 250 },
        { month: 'Dec', users: 200 },
    ],

    sportsActivity: [
        { sport: 'Basketball', bookings: 2850 },
        { sport: 'Tennis', bookings: 2200 },
        { sport: 'Football', bookings: 1800 },
        { sport: 'Badminton', bookings: 1500 },
        { sport: 'Volleyball', bookings: 850 },
        { sport: 'Swimming', bookings: 650 },
    ],

    earnings: [
        { month: 'Jan', earnings: 25000 },
        { month: 'Feb', earnings: 28000 },
        { month: 'Mar', earnings: 32000 },
        { month: 'Apr', earnings: 38000 },
        { month: 'May', earnings: 42000 },
        { month: 'Jun', earnings: 48000 },
    ],
};

export const pendingFacilities = [
    {
        id: 1,
        name: 'City Sports Complex',
        owner: 'John Smith',
        location: 'Downtown District',
        courts: 8,
        sports: ['Basketball', 'Tennis', 'Volleyball'],
        submittedDate: '2024-01-15',
        images: [
            'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
            'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
            'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
        ],
        description: 'Modern sports complex with state-of-the-art facilities including 8 courts with professional lighting and sound systems.',
        amenities: ['Parking', 'Changing Rooms', 'Cafeteria', 'AC'],
        operatingHours: '6:00 AM - 10:00 PM',
        status: 'pending'
    },
    {
        id: 2,
        name: 'Elite Tennis Academy',
        owner: 'Sarah Johnson',
        location: 'Sports District',
        courts: 6,
        sports: ['Tennis'],
        submittedDate: '2024-01-12',
        images: [
            'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg',
            'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
        ],
        description: 'Professional tennis academy with indoor and outdoor courts, perfect for training and tournaments.',
        amenities: ['Pro Shop', 'Coaching', 'Equipment Rental'],
        operatingHours: '5:00 AM - 11:00 PM',
        status: 'pending'
    },
    {
        id: 3,
        name: 'Community Basketball Hub',
        owner: 'Mike Davis',
        location: 'North Side',
        courts: 4,
        sports: ['Basketball'],
        submittedDate: '2024-01-10',
        images: [
            'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
        ],
        description: 'Community-focused basketball facility designed for local leagues and youth programs.',
        amenities: ['Scoreboard', 'Bleachers', 'Storage'],
        operatingHours: '7:00 AM - 9:00 PM',
        status: 'pending'
    }
];

export const usersData = [
    {
        id: 1,
        name: 'Alex Thompson',
        email: 'alex.thompson@email.com',
        role: 'user',
        status: 'active',
        joinedDate: '2023-08-15',
        bookings: 24,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        role: 'facility_owner',
        status: 'active',
        joinedDate: '2023-06-10',
        facilities: 2,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    },
    {
        id: 3,
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        role: 'user',
        status: 'banned',
        joinedDate: '2023-09-20',
        bookings: 8,
        avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    },
    {
        id: 4,
        name: 'Emma Brown',
        email: 'emma.brown@email.com',
        role: 'facility_owner',
        status: 'active',
        joinedDate: '2023-07-25',
        facilities: 1,
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    },
    {
        id: 5,
        name: 'David Lee',
        email: 'david.lee@email.com',
        role: 'user',
        status: 'active',
        joinedDate: '2024-01-05',
        bookings: 15,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    }
];

export const reportsData = [
    {
        id: 1,
        type: 'inappropriate_content',
        reporter: 'User #1234',
        reported: 'John Doe',
        description: 'Inappropriate comments in facility review',
        date: '2024-01-15',
        status: 'pending',
        priority: 'high'
    },
    {
        id: 2,
        type: 'facility_issue',
        reporter: 'User #5678',
        reported: 'Downtown Sports Center',
        description: 'Facility not maintaining proper hygiene standards',
        date: '2024-01-14',
        status: 'investigating',
        priority: 'medium'
    },
    {
        id: 3,
        type: 'booking_dispute',
        reporter: 'User #9012',
        reported: 'Elite Tennis Club',
        description: 'Double booking issue, court was not available despite confirmation',
        date: '2024-01-13',
        status: 'resolved',
        priority: 'low'
    }
];

export const adminProfile = {
    name: 'Admin User',
    email: 'admin@urbanathlete.com',
    role: 'Super Admin',
    joinedDate: '2023-01-01',
    avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    permissions: ['user_management', 'facility_approval', 'reports_moderation', 'system_settings']
};