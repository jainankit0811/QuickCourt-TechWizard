import { getOwnerDashboard, getAdminDashboard } from '../services/dashBoardService.js';

const getDashboard = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    let data;
    if (role === 'facility_owner') {
      data = await getOwnerDashboard(userId);
    } else if (role === 'admin') {
      data = await getAdminDashboard();
    } else {
      return res.status(403).json({ message: 'No dashboard for this role' });
    }
    
    // Chart configs for frontend
    const charts = {
      bookingTrends: {
        type: 'line',
        data: {
          labels: data.trends?.map(t => t._id) || [],
          datasets: [{
            label: 'Bookings per Day',
            data: data.trends?.map(t => t.count) || [],
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            fill: true,
          }],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      },
      earningsSummary: {
        type: 'bar',
        data: {
          labels: data.earningsSummary?.map(e => e._id) || [],
          datasets: [{
            label: 'Monthly Earnings',
            data: data.earningsSummary?.map(e => e.total) || [],
            backgroundColor: '#50C878',
          }],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      },
      peakHours: {
        type: 'bar',
        data: {
          labels: data.peakHours?.map(h => `${h._id}:00`) || [],
          datasets: [{
            label: 'Bookings by Hour',
            data: data.peakHours?.map(h => h.count) || [],
            backgroundColor: '#FF6B6B',
          }],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      },
      mostActiveSports: role === 'admin' ? {
        type: 'pie',
        data: {
          labels: data.mostActiveSports?.map(s => s._id) || [],
          datasets: [{
            label: 'Bookings by Sport',
            data: data.mostActiveSports?.map(s => s.count) || [],
            backgroundColor: ['#4A90E2', '#50C878', '#FF6B6B', '#FFD700', '#6A5ACD'],
          }],
        },
        options: { responsive: true },
      } : null,
    };

    res.status(200).json({ ...data, charts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getDashboard };