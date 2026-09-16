
        // --- 1. Global Chart Settings ---
        Chart.register(ChartDataLabels);
        Chart.defaults.plugins.datalabels.color = '#475569';
        Chart.defaults.plugins.datalabels.font = { weight: 'bold' };
        
        // --- 2. Tab Switching Logic ---
        function switchTab(tabId) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(el => {
                el.style.display = 'none';
            });
            
            // Reset all menu items
            document.querySelectorAll('.menu-item').forEach(el => {
                el.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
                el.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
            });
            
            // Show selected tab
            document.getElementById(tabId).style.display = 'block';
            
            // Highlight selected menu item
            const navItem = document.getElementById('nav-' + tabId);
            if (navItem) {
                navItem.classList.remove('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
                navItem.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
            }
            
            // Scroll to top of the container
            document.getElementById('scroll-container').scrollTop = 0;
            
            // Trigger window resize to force Chart.js and ECharts to re-render properly in the new visible container
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 50);
        }

        // --- 3. Page Scripts Execution ---
        
// --- page1 script ---

        // Register the datalabels plugin for all charts globally, but default it to false
        
        

        document.addEventListener('DOMContentLoaded', function() {
            
            // Mock data for July 2026 (1st to 15th for illustrative purposes)
            const labels = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07', '08/07', '09/07', '10/07', '11/07', '12/07', '13/07', '14/07', '15/07'];
            
            const webUsersData = [450, 480, 420, 510, 590, 620, 580, 550, 610, 670, 720, 690, 640, 680, 710];
            const gameUsersData = [120, 150, 180, 220, 310, 350, 320, 280, 340, 390, 450, 480, 410, 430, 460];
            const memberUsersData = [100, 110, 105, 125, 140, 155, 150, 145, 160, 175, 190, 185, 170, 180, 195];

            // Helper function to create sparklines
            function createSparkline(chartId, data, color) {
                const ctxSpark = document.getElementById(chartId).getContext('2d');
                new Chart(ctxSpark, {
                    type: 'line',
                    data: {
                        labels: labels, // Use the same 15-day labels as main chart
                        datasets: [{
                            data: data,
                            borderColor: color,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0, // Hide points for sparkline look
                            pointHoverRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                            datalabels: { display: false } // Explicitly disable here
                        },
                        scales: {
                            x: { display: false }, 
                            y: { display: false, beginAtZero: false } 
                        },
                        scales: {
                            x: { display: false }, // Hide x axis
                            y: { display: false, beginAtZero: false } // Hide y axis, scale to fit min/max naturally
                        },
                        layout: {
                            padding: 0
                        }
                    }
                });
            }

            // Generate mock data for the 5 sparklines
            // 1. Total Users (Trend: Upwards)
            const totalUsersTrend = [800, 820, 810, 850, 900, 890, 930, 950, 1000, 1050, 1100, 1150, 1120, 1180, 1250];
            createSparkline('sparkline-total-users', totalUsersTrend, '#3b82f6'); // Blue-500

            // 2. Total Taps
            const totalTapsTrend = [2800, 2950, 3100, 3050, 3400, 3600, 3500, 3300, 3700, 4000, 4200, 4100, 3900, 4300, 4500];
            createSparkline('sparkline-total-taps', totalTapsTrend, '#e11d48'); // Rose-600

            // 3. Web Users
            createSparkline('sparkline-web-users', webUsersData, '#6366f1'); // Indigo-500

            // 4. Game Users
            createSparkline('sparkline-game-users', gameUsersData, '#a855f7'); // Purple-500

            // 5. Total Members
            const totalMembersTrend = [3900, 3910, 3920, 3915, 3930, 3940, 3935, 3920, 3910, 3905, 3890, 3885, 3880, 3890, 3890];
            createSparkline('sparkline-total-members', totalMembersTrend, '#f43f5e');

            // 6. Quests Started
            const questsStartedTrend = [75, 80, 95, 85, 110, 125, 115, 90, 105, 130, 145, 155, 140, 160, 175];
            createSparkline('sparkline-quests-started', questsStartedTrend, '#10b981'); // Emerald

            // 7. Quests Completed
            const questsCompletedTrend = [45, 55, 60, 50, 75, 90, 80, 65, 70, 95, 105, 115, 95, 110, 130];
            createSparkline('sparkline-quests-completed', questsCompletedTrend, '#14b8a6'); // Teal

            // 8. Challenges Started
            const challengesStartedTrend = [200, 220, 250, 230, 280, 310, 290, 240, 270, 330, 360, 380, 340, 390, 420];
            createSparkline('sparkline-challenges-started', challengesStartedTrend, '#06b6d4'); // Cyan

            // 9. Challenges Completed
            const challengesCompletedTrend = [160, 180, 210, 190, 240, 260, 250, 200, 230, 280, 310, 320, 290, 330, 360];
            createSparkline('sparkline-challenges-completed', challengesCompletedTrend, '#0ea5e9'); // Sky

            // --- MAIN CHARTS --- //

            // Chart: Operations Trend (5 Lines)
            const ctxOperations = document.getElementById('chart-operations-trends').getContext('2d');
            new Chart(ctxOperations, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Số Lượt Tap Chip', data: totalTapsTrend, borderColor: '#e11d48', backgroundColor: 'rgba(225, 29, 72, 0.1)', tension: 0.4, borderWidth: 2, yAxisID: 'y' },
                        { label: 'Số Người Tap Chip', data: gameUsersData, borderColor: '#a855f7', tension: 0.4, borderWidth: 2, borderDash: [5, 5], yAxisID: 'y1' },
                        { label: 'Thử Thách Bắt Đầu', data: challengesStartedTrend, borderColor: '#06b6d4', tension: 0.4, borderWidth: 2, yAxisID: 'y1' },
                        { label: 'Thử Thách Hoàn Thành', data: challengesCompletedTrend, borderColor: '#0ea5e9', tension: 0.4, borderWidth: 2, yAxisID: 'y1' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 6 } },
                        datalabels: { 
                            display: false // Tắt label cho biểu đồ theo ngày
                        }
                    },
                    scales: {
                        y: { 
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: { display: true, text: 'Lượt Tap' },
                            grid: { borderDash: [4, 4] } 
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: { display: true, text: 'Người dùng / Thử thách' },
                            grid: { drawOnChartArea: false } // Prevent grid line overlap
                        },
                        x: { grid: { display: false } }
                    }
                }
            });

            // Chart 3: Heatmap (Rendered natively via DOM elements for a clean look)
            const heatmapContainer = document.getElementById('heatmap-container');
            const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
            const hoursOfDay = Array.from({length: 24}, (_, i) => i);
            
            let heatmapHTML = '<div class="flex flex-col gap-1 min-w-[600px] text-xs font-sans">';
            
            // Header row (hours)
            heatmapHTML += '<div class="flex gap-1 mb-1"><div class="w-8 text-transparent">-</div>';
            hoursOfDay.forEach(h => {
                heatmapHTML += `<div class="flex-1 text-center text-slate-400">${h}</div>`;
            });
            heatmapHTML += '</div>';

            // Rows (days)
            daysOfWeek.forEach(day => {
                heatmapHTML += `<div class="flex gap-1 items-center">`;
                heatmapHTML += `<div class="w-8 text-slate-500 font-medium text-right pr-2">${day}</div>`;
                hoursOfDay.forEach(h => {
                    // Generate realistic mock data for physical interactions
                    let intensity = Math.random() * 0.2; // Base noise
                    if ((day === 'T7' || day === 'CN') && h >= 9 && h <= 21) {
                        intensity = 0.5 + Math.random() * 0.5; // Very high traffic on weekends day time
                    } else if (h >= 17 && h <= 21) {
                        intensity = 0.4 + Math.random() * 0.4; // High traffic evenings
                    } else if (h >= 10 && h <= 14) {
                        intensity = 0.2 + Math.random() * 0.3; // Mid traffic lunch hours
                    } else if (h < 6) {
                        intensity = 0.02 + Math.random() * 0.05; // Dead at night
                    }
                    
                    let bgOpacity = Math.max(0.05, intensity).toFixed(2);
                    let val = Math.floor(intensity * 1200); // Fake scan count
                    
                    // Đổi màu chữ tự động: Nền đậm thì chữ trắng, nền nhạt thì chữ đen
                    let textColor = intensity > 0.55 ? 'text-white' : 'text-slate-800';
                    
                    // Tách lớp background riêng để dùng opacity, giữ nguyên độ nét cho text
                    heatmapHTML += `<div class="flex-1 h-8 rounded-sm relative hover:scale-[1.15] hover:z-10 transition-transform origin-center cursor-help flex items-center justify-center" title="${day}, ${h}:00 - Lượt quét: ${val}">
                        <div class="absolute inset-0 bg-rose-500 rounded-sm" style="opacity: ${bgOpacity}"></div>
                        <span class="relative z-10 text-[9px] sm:text-[10px] tracking-tighter font-bold ${textColor} pointer-events-none">${val}</span>
                    </div>`;
                });
                heatmapHTML += `</div>`;
            });
            heatmapHTML += '</div>';
            heatmapContainer.innerHTML = heatmapHTML;

            
            // 1. Chart: Top 5 Locations (Donut)
            const ctxTopLocations = document.getElementById('chart-top-locations').getContext('2d');
            new Chart(ctxTopLocations, {
                type: 'doughnut',
                data: {
                    labels: ['Quảng trường', 'Khu Khảo Cổ', 'Vườn Bí Mật', 'Tháp Đồng Hồ', 'Nhà Hát'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '55%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, boxWidth: 8 } },
                        datalabels: {
                            display: true,
                            anchor: 'center', // Neo ở giữa
                            align: 'center',  // Căn ở giữa (bên trong cột tròn)
                            color: '#fff',
                            font: { weight: 'bold', size: 11 },
                            formatter: (value) => {
                                return value + '%';
                            }
                        }
                    }
                }
            });

            // 2. Chart: Member vs Guest (Donut)
            const ctxMemberGuest = document.getElementById('chart-member-guest').getContext('2d');
            new Chart(ctxMemberGuest, {
                type: 'doughnut',
                data: {
                    labels: ['Thành viên', 'Khách vãng lai'],
                    datasets: [{
                        data: [65, 35],
                        backgroundColor: ['#6366f1', '#cbd5e1'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, boxWidth: 8 } },
                        datalabels: {
                            display: true,
                            anchor: 'center', // Neo ở giữa
                            align: 'center',  // Căn ở giữa (bên trong cột tròn)
                            color: (context) => {
                                return context.dataIndex === 1 ? '#475569' : '#fff'; // Dark text for light slice
                            },
                            font: { weight: 'bold', size: 12 },
                            formatter: (value) => {
                                return value + '%';
                            }
                        }
                    }
                }
            });

            // 3. Chart: Quest Completion (Gauge simulated with Doughnut)
            const ctxCompletionRate = document.getElementById('chart-completion-rate').getContext('2d');
            new Chart(ctxCompletionRate, {
                type: 'doughnut',
                data: {
                    labels: ['Hoàn thành', 'Bỏ dở'],
                    datasets: [{
                        data: [68, 32],
                        backgroundColor: ['#10b981', '#e2e8f0'], // Emerald for completion, Gray for remainder
                        borderWidth: 0,
                        circumference: 180, // Half circle
                        rotation: 270 // Start from left side
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '80%',
                    plugins: {
                        legend: { display: false },
                        datalabels: { 
                            display: true,
                            anchor: 'center', // Nằm trong lát cắt
                            align: 'center',
                            color: (context) => context.dataIndex === 0 ? '#047857' : '#94a3b8',
                            font: { weight: 'bold', size: 12 },
                            formatter: (value) => value + '%'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) { return context.label + ': ' + context.parsed + '%'; }
                            }
                        }
                    }
                }
            });

            // 4. Chart: Average Solving Speed (Horizontal Bar)
            const ctxSolvingSpeed = document.getElementById('chart-solving-speed').getContext('2d');
            new Chart(ctxSolvingSpeed, {
                type: 'bar',
                data: {
                    labels: ['Tháp Đồng Hồ (Khó)', 'Khu Khảo Cổ', 'Nhà Hát', 'Vườn Bí Mật', 'Quảng trường (Dễ)'],
                    datasets: [{
                        label: 'Thời gian (Giây)',
                        data: [185, 142, 110, 85, 45],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    indexAxis: 'y', // Makes it horizontal
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',   // Neo ở cuối cột
                            align: 'right',  // Căn ra bên ngoài cột (bên phải)
                            color: '#3b82f6',
                            font: { weight: 'bold' },
                            formatter: (value) => value + 's'
                        }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { borderDash: [4, 4] }, grace: '10%' }, // Add grace space for labels
                        y: { grid: { display: false } }
                    },
                    layout: {
                        padding: { right: 30 } // Space for labels
                    }
                }
            });

            // 5. Chart: Frequency of Returning Users (Vertical Bar)
            const ctxReturningUsers = document.getElementById('chart-returning-users').getContext('2d');
            new Chart(ctxReturningUsers, {
                type: 'bar',
                data: {
                    labels: ['1 Ngày', '2 Ngày', '3 Ngày', '4 Ngày', '5+ Ngày'],
                    datasets: [{
                        label: 'Số lượng người chơi',
                        data: [4200, 1850, 920, 410, 150],
                        backgroundColor: 'rgba(139, 92, 246, 0.7)', // Purple
                        borderColor: '#8b5cf6',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: { 
                            display: true,
                            anchor: 'end', // Neo ở đỉnh cột
                            align: 'top',  // Đẩy ra bên ngoài phía trên
                            color: '#d97706',
                            font: { weight: '600', size: 10 },
                            formatter: (value) => value
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, grace: '10%' },
                        x: { grid: { display: false } }
                    }
                }
            });

            // 6. Chart: Average Session Duration (Line Chart)
            const ctxSessionDuration = document.getElementById('chart-session-duration').getContext('2d');
            new Chart(ctxSessionDuration, {
                type: 'line',
                data: {
                    labels: labels, // Dùng lại nhãn 15 ngày ở trên
                    datasets: [{
                        label: 'Thời gian (Phút)',
                        data: [3.5, 3.8, 4.1, 4.0, 5.2, 5.5, 4.8, 4.5, 4.9, 5.8, 6.2, 6.5, 5.9, 6.0, 6.4],
                        borderColor: '#f59e0b', // Amber
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
                        x: { grid: { display: false } }
                    }
                }
            });

            // 7. Chart: UTM Acquisition Channels (Horizontal Bar Chart)
            const ctxAcquisition = document.getElementById('chart-acquisition-channels').getContext('2d');
            new Chart(ctxAcquisition, {
                type: 'bar',
                data: {
                    labels: ['QR Thực Địa', 'Facebook', 'Tự Nhiên', 'Trực Tiếp', 'Tiktok'],
                    datasets: [{
                        label: 'Lượt truy cập',
                        data: [3200, 2100, 1500, 1200, 800],
                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#64748b', '#000000'],
                        borderRadius: 4
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',   // Neo ở cuối cột
                            align: 'right',  // Nằm ngoài cột (bên phải)
                            color: '#475569',
                            font: { weight: '600', size: 11 },
                            formatter: (value) => value.toLocaleString()
                        }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { borderDash: [4, 4] }, grace: '15%' },
                        y: { grid: { display: false } }
                    },
                    layout: {
                        padding: { right: 40 }
                    }
                }
            });

            // 8. Chart: Device Category (Pie Chart)
            const ctxDeviceCategory = document.getElementById('chart-device-category').getContext('2d');
            new Chart(ctxDeviceCategory, {
                type: 'pie',
                data: {
                    labels: ['iOS', 'Android', 'Windows', 'MacOS'],
                    datasets: [{
                        data: [55, 35, 7, 3],
                        backgroundColor: ['#000000', '#3ddc84', '#0078d4', '#e2e8f0'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15, boxWidth: 8 } },
                        datalabels: {
                            display: true,
                            anchor: 'center', // Neo ở giữa lát cắt
                            align: 'center',  // Căn ở giữa (bên trong)
                            color: (context) => {
                                // Dark text for MacOS and Android, light for others
                                return (context.dataIndex === 1 || context.dataIndex === 3) ? '#1e293b' : '#fff'; 
                            },
                            font: { weight: 'bold', size: 12 },
                            formatter: (value) => {
                                return value > 5 ? value + '%' : ''; // Hide label if too small slice
                            }
                        }
                    }
                }
            });

        });
    

// --- page2 script ---

        // Kích hoạt Datalabels mặc định nhưng set display = false để chỉ bật khi cần
        
        

        document.addEventListener('DOMContentLoaded', function() {
            const labelsSparkline = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07', '08/07', '09/07', '10/07', '11/07', '12/07', '13/07', '14/07', '15/07'];
            
            function createSparkline(chartId, data, color) {
                const ctxSpark = document.getElementById(chartId).getContext('2d');
                new Chart(ctxSpark, {
                    type: 'line',
                    data: {
                        labels: labelsSparkline,
                        datasets: [{ data: data, borderColor: color, borderWidth: 2, tension: 0.4, pointRadius: 0, pointHoverRadius: 0 }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { enabled: false }, datalabels: { display: false } },
                        scales: { x: { display: false }, y: { display: false, beginAtZero: false } },
                        layout: { padding: 0 }
                    }
                });
            }

            const uniqueStartsTrend = [110, 115, 125, 120, 130, 140, 135, 125, 145, 150, 160, 155, 140, 150, 162];
            createSparkline('sparkline-unique-starts', uniqueStartsTrend, '#3b82f6');

            const uniqueCompletesTrend = [90, 95, 100, 98, 110, 115, 110, 105, 120, 125, 130, 128, 115, 120, 135];
            createSparkline('sparkline-unique-completes', uniqueCompletesTrend, '#10b981');

            // Danh sách trạm
            const originalLocations = ['Quảng trường (Dễ)', 'Khu Khảo Cổ', 'Vườn Bí Mật', 'Nhà Hát', 'Tháp Đồng Hồ (Khó)'];
            let currentLocations = [...originalLocations];
            
            const originalTapData = [1650, 1250, 1080, 820, 710];
            const originalLoginData = [950, 780, 810, 520, 480];
            let currentTapData = [...originalTapData];
            let currentLoginData = [...originalLoginData];

            const startsData = [1250, 980, 850, 620, 540];
            const completesData = [1180, 810, 720, 480, 310];
            
            const successRates = startsData.map((start, index) => {
                return ((completesData[index] / start) * 100).toFixed(1);
            });

            const dwellTimes = [120, 240, 180, 310, 450]; 

            // --- NEW CHART: Tap & Login Volumes ---
            const ctxTapLogin = document.getElementById('chart-tap-login').getContext('2d');
            const tapLoginChart = new Chart(ctxTapLogin, {
                type: 'bar',
                data: {
                    labels: currentLocations,
                    datasets: [
                        { label: 'Lượt Tap Chip', data: currentTapData, backgroundColor: '#f43f5e', borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 },
                        { label: 'Lượt Đăng Nhập (Login)', data: currentLoginData, backgroundColor: '#8b5cf6', borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 20 } },
                        datalabels: { display: true, anchor: 'end', align: 'top', color: '#475569', font: { weight: 'bold' } }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, grace: '15%' },
                        x: { grid: { display: false } }
                    }
                }
            });

            // Sorting Logic for Tap & Login Chart
            document.getElementById('sort-tap-login').addEventListener('change', function(e) {
                const sortType = e.target.value;
                if (sortType === 'journey') {
                    tapLoginChart.data.labels = [...originalLocations];
                    tapLoginChart.data.datasets[0].data = [...originalTapData];
                    tapLoginChart.data.datasets[1].data = [...originalLoginData];
                } else if (sortType === 'desc') {
                    let combinedData = originalLocations.map((loc, index) => {
                        return { location: loc, tap: originalTapData[index], login: originalLoginData[index] };
                    });
                    combinedData.sort((a, b) => b.tap - a.tap);
                    tapLoginChart.data.labels = combinedData.map(item => item.location);
                    tapLoginChart.data.datasets[0].data = combinedData.map(item => item.tap);
                    tapLoginChart.data.datasets[1].data = combinedData.map(item => item.login);
                }
                tapLoginChart.update();
            });

            // --- CHART 1: Challenge Volumes ---
            const ctxVolumes = document.getElementById('chart-volumes').getContext('2d');
            new Chart(ctxVolumes, {
                type: 'bar',
                data: {
                    labels: originalLocations,
                    datasets: [
                        { label: 'Đã bắt đầu (Start)', data: startsData, backgroundColor: '#3b82f6', borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 },
                        { label: 'Đã hoàn thành (Complete)', data: completesData, backgroundColor: '#10b981', borderRadius: 4, barPercentage: 0.7, categoryPercentage: 0.8 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 20 } },
                        datalabels: { display: true, anchor: 'end', align: 'top', color: '#475569', font: { weight: 'bold' } },
                        tooltip: {
                            callbacks: {
                                footer: (tooltipItems) => {
                                    if(tooltipItems.length === 2) {
                                        const start = tooltipItems[0].raw;
                                        const complete = tooltipItems[1].raw;
                                        const dropOff = start - complete;
                                        const dropOffPercent = ((dropOff / start) * 100).toFixed(1);
                                        return `Rớt phễu: ${dropOff} lượt (${dropOffPercent}%)`;
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Số lượng sự kiện' }, grace: '15%' },
                        x: { grid: { display: false } }
                    }
                }
            });

            // --- CHART 2: Success Rate ---
            const ctxSuccess = document.getElementById('chart-success-rate').getContext('2d');
            new Chart(ctxSuccess, {
                type: 'bar',
                data: {
                    labels: originalLocations,
                    datasets: [{ label: 'Tỷ lệ thành công (%)', data: successRates, backgroundColor: 'rgba(16, 185, 129, 0.8)', borderColor: '#10b981', borderWidth: 1, borderRadius: 4 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        datalabels: { display: true, anchor: 'end', align: 'top', color: '#047857', font: { weight: 'bold' }, formatter: (value) => value + '%' },
                        tooltip: { callbacks: { label: function(context) { return context.parsed.y + '%'; } } }
                    },
                    scales: {
                        y: { beginAtZero: true, max: 115, grid: { borderDash: [4, 4] }, ticks: { callback: function(value) { return value + '%'; } } },
                        x: { grid: { display: false } }
                    }
                }
            });

            // --- CHART 3: Average Dwell Time ---
            const ctxDwellTime = document.getElementById('chart-dwell-time').getContext('2d');
            new Chart(ctxDwellTime, {
                type: 'bar',
                data: {
                    labels: originalLocations,
                    datasets: [{ label: 'Thời gian (Giây)', data: dwellTimes, backgroundColor: 'rgba(245, 158, 11, 0.8)', borderColor: '#d97706', borderWidth: 1, borderRadius: 4 }]
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        datalabels: { display: true, anchor: 'end', align: 'right', color: '#b45309', font: { weight: 'bold' }, formatter: (value) => value + 's' },
                        tooltip: { callbacks: { label: function(context) { return context.parsed.x + ' giây'; } } }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Giây (s)' }, grace: '15%' },
                        y: { grid: { display: false } }
                    },
                    layout: { padding: { right: 35 } }
                }
            });

            // --- CHART 4: First Challenge Completion Duration (Donut) ---
            const ctxFirstDuration = document.getElementById('chart-first-duration').getContext('2d');
            new Chart(ctxFirstDuration, {
                type: 'doughnut',
                data: {
                    labels: ['< 1 Phút', '1 - 3 Phút', '3 - 5 Phút', '> 5 Phút'],
                    datasets: [{ data: [35, 45, 15, 5], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e'], borderWidth: 2, borderColor: '#ffffff' }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, cutout: '60%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, boxWidth: 8 } },
                        datalabels: { display: true, anchor: 'center', align: 'center', color: '#fff', font: { weight: 'bold', size: 12 }, formatter: (value) => { return value > 5 ? value + '%' : ''; } },
                        tooltip: { callbacks: { label: function(context) { return context.label + ': ' + context.parsed + '% người chơi'; } } }
                    }
                }
            });

            // --- CHART 5: Hourly Station Throughput Rate (Line) ---
            const ctxThroughput = document.getElementById('chart-hourly-throughput').getContext('2d');
            new Chart(ctxThroughput, {
                type: 'line',
                data: {
                    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                    datasets: [
                        { label: 'Quảng trường', data: [45, 120, 180, 150, 220, 310, 250], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 2, tension: 0.4 },
                        { label: 'Tháp Đồng Hồ', data: [20, 85, 140, 110, 175, 245, 210], borderColor: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)', borderWidth: 2, tension: 0.4 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6 } },
                        datalabels: { display: false },
                        tooltip: { callbacks: { label: function(context) { return context.dataset.label + ': ' + context.parsed.y + ' scans'; } } }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Số lượng Scan' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        });
    

// --- page3 script ---

        // Kích hoạt Datalabels mặc định
        
        
        // Cấu hình mặc định cho tất cả các biểu đồ để tránh lặp code
        
        
        
        document.addEventListener('DOMContentLoaded', function() {
            
            // --- Chart 1: Challenge Volumes (Members vs Guests) - Stacked Bar ---
            const originalLocationsMG = ['Quảng trường', 'Nhà Hát', 'Khu Khảo Cổ', 'Vườn Bí Mật', 'Tháp Đồng Hồ'];
            const originalMemberData = [850, 420, 680, 590, 240];
            const originalGuestData = [330, 60, 130, 130, 70];

            const ctxMemberGuest = document.getElementById('chart-member-guest-volume').getContext('2d');
            const memberGuestChart = new Chart(ctxMemberGuest, {
                type: 'bar',
                data: {
                    labels: [...originalLocationsMG],
                    datasets: [
                        {
                            label: 'Thành viên (Members)',
                            data: [...originalMemberData], // Mock member completes
                            backgroundColor: '#6366f1', // Indigo-500
                            borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 },
                            barPercentage: 0.6,
                        },
                        {
                            label: 'Khách vãng lai (Guests)',
                            data: [...originalGuestData], // Mock guest completes
                            backgroundColor: '#cbd5e1', // Slate-300
                            borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
                            barPercentage: 0.6,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 20 } },
                        datalabels: {
                            display: true,
                            color: '#fff',
                            font: {size: 11},
                            formatter: (value) => value > 100 ? value : '' // Chỉ hiện số lớn để không bị chật
                        },
                        tooltip: {
                            callbacks: {
                                footer: (tooltipItems) => {
                                    let total = 0;
                                    tooltipItems.forEach(item => total += item.raw);
                                    return `Tổng hoàn thành: ${total}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Số thử thách hoàn thành' }, grace: '10%' }
                    }
                }
            });

            // Sorting logic for Member vs Guest chart
            document.getElementById('sort-member-guest').addEventListener('change', function(e) {
                const sortType = e.target.value;
                if (sortType === 'journey') {
                    memberGuestChart.data.labels = [...originalLocationsMG];
                    memberGuestChart.data.datasets[0].data = [...originalMemberData];
                    memberGuestChart.data.datasets[1].data = [...originalGuestData];
                } else if (sortType === 'desc') {
                    let combinedData = originalLocationsMG.map((loc, index) => {
                        return {
                            location: loc,
                            member: originalMemberData[index],
                            guest: originalGuestData[index],
                            total: originalMemberData[index] + originalGuestData[index]
                        };
                    });
                    // Sort descending by total volume
                    combinedData.sort((a, b) => b.total - a.total);
                    
                    memberGuestChart.data.labels = combinedData.map(item => item.location);
                    memberGuestChart.data.datasets[0].data = combinedData.map(item => item.member);
                    memberGuestChart.data.datasets[1].data = combinedData.map(item => item.guest);
                }
                memberGuestChart.update();
            });

            // --- Chart 2: Retention Matrix (HTML generation) ---
            const retentionData = [
                { date: '01/07', users: 1250, d1: 45.2, d2: 22.1, d3: 15.4, d4: 10.2, d5: 8.5, d6: 4.1, d7: 2.5 },
                { date: '02/07', users: 1420, d1: 42.8, d2: 24.5, d3: 18.0, d4: 12.1, d5: 7.2, d6: 5.0, d7: null },
                { date: '03/07', users: 980,  d1: 48.5, d2: 28.2, d3: 19.5, d4: 15.0, d5: 9.1, d6: null, d7: null },
                { date: '04/07', users: 1105, d1: 39.1, d2: 20.4, d3: 14.2, d4: 9.5,  d5: null, d6: null, d7: null },
                { date: '05/07', users: 1650, d1: 52.4, d2: 31.0, d3: 22.8, d4: null, d5: null, d6: null, d7: null },
                { date: '06/07', users: 1540, d1: 47.0, d2: 25.5, d3: null, d4: null, d5: null, d6: null, d7: null },
                { date: '07/07', users: 1320, d1: 41.5, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null },
            ];

            function getColor(value) {
                if (value === null) return 'background-color: #f8fafc; color: #cbd5e1;'; // Empty/Future
                if (value >= 40) return 'background-color: #10b981; color: white;'; // High (Emerald)
                if (value >= 25) return 'background-color: #34d399; color: white;'; 
                if (value >= 15) return 'background-color: #6ee7b7; color: #0f172a;';
                if (value >= 8)  return 'background-color: #a7f3d0; color: #0f172a;';
                return 'background-color: #d1fae5; color: #0f172a;'; // Low
            }

            const tbody = document.getElementById('retention-tbody');
            let html = '';
            retentionData.forEach(row => {
                html += `<tr class="hover:bg-slate-50">
                    <td class="font-medium text-left bg-white">${row.date}</td>
                    <td class="font-bold bg-white">${row.users.toLocaleString()}</td>
                    <td style="${getColor(row.d1)}">${row.d1 ? row.d1 + '%' : '-'}</td>
                    <td style="${getColor(row.d2)}">${row.d2 ? row.d2 + '%' : '-'}</td>
                    <td style="${getColor(row.d3)}">${row.d3 ? row.d3 + '%' : '-'}</td>
                    <td style="${getColor(row.d4)}">${row.d4 ? row.d4 + '%' : '-'}</td>
                    <td style="${getColor(row.d5)}">${row.d5 ? row.d5 + '%' : '-'}</td>
                    <td style="${getColor(row.d6)}">${row.d6 ? row.d6 + '%' : '-'}</td>
                    <td style="${getColor(row.d7)}">${row.d7 ? row.d7 + '%' : '-'}</td>
                </tr>`;
            });
            tbody.innerHTML = html;


            // --- Chart 3: Challenges Attempted Per User (Vertical Bar) ---
            const ctxPerUser = document.getElementById('chart-challenges-per-user').getContext('2d');
            new Chart(ctxPerUser, {
                type: 'bar',
                data: {
                    labels: ['Đã chơi 1 trạm', 'Đã chơi 2 trạm', 'Đã chơi 3 trạm', 'Đã chơi 4 trạm', 'Đã chơi cả 5 trạm'],
                    datasets: [{
                        label: 'Số lượng người dùng',
                        data: [4200, 2150, 1120, 540, 280], // Exponential decay model mockup
                        backgroundColor: 'rgba(139, 92, 246, 0.8)', // Purple-500
                        borderColor: '#8b5cf6',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            color: '#8b5cf6',
                            formatter: (value) => value.toLocaleString()
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Lượng người chơi (Users)' }, grace: '15%' },
                        x: { grid: { display: false } }
                    }
                }
            });

            // --- NEW Chart: Challenges Completed Per User (Vertical Bar) ---
            const ctxCompletedPerUser = document.getElementById('chart-completed-per-user').getContext('2d');
            new Chart(ctxCompletedPerUser, {
                type: 'bar',
                data: {
                    labels: ['Hoàn thành 1 trạm', 'Hoàn thành 2 trạm', 'Hoàn thành 3 trạm', 'Hoàn thành 4 trạm', 'Hoàn thành đủ 5 trạm'],
                    datasets: [{
                        label: 'Số lượng người dùng',
                        data: [3800, 1850, 820, 310, 120], // Adjusted to be lower than attempted due to drop-off
                        backgroundColor: 'rgba(16, 185, 129, 0.8)', // Emerald-500
                        borderColor: '#10b981',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            color: '#059669', // Darker emerald for text
                            formatter: (value) => value.toLocaleString()
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Lượng người chơi (Users)' }, grace: '15%' },
                        x: { grid: { display: false } }
                    }
                }
            });

            // --- Chart 4: Consecutive Scan Intervals (Histogram using Bar Chart) ---
            const ctxIntervals = document.getElementById('chart-scan-intervals').getContext('2d');
            new Chart(ctxIntervals, {
                type: 'bar',
                data: {
                    labels: ['< 5 phút', '5 - 15 phút', '15 - 30 phút', '30 - 60 phút', '1 - 2 tiếng', '> 2 tiếng'],
                    datasets: [{
                        label: 'Tần suất (Số lượt di chuyển)',
                        data: [450, 1850, 3200, 1500, 620, 180], // Bell curve mockup leaning right
                        backgroundColor: 'rgba(245, 158, 11, 0.8)', // Amber-500
                        borderColor: '#d97706',
                        borderWidth: 1,
                        borderRadius: 2,
                        barPercentage: 1.0,      // Make bars touch each other for histogram look
                        categoryPercentage: 1.0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'top',
                            color: '#d97706',
                            font: {size: 10},
                            formatter: (value) => value > 200 ? value : ''
                        }
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4] }, title: { display: true, text: 'Số lượng phiên (Lượt)' }, grace: '10%' },
                        x: { 
                            grid: { display: false },
                            ticks: { maxRotation: 45, minRotation: 0 }
                        }
                    }
                }
            });

            // --- Chart 6: Post-Badge Engagement Rate (Pie/Donut Chart) ---
            const ctxPostBadge = document.getElementById('chart-post-badge').getContext('2d');
            new Chart(ctxPostBadge, {
                type: 'doughnut',
                data: {
                    labels: ['Tiếp tục tương tác', 'Không hoạt động (Rời đi)'],
                    datasets: [{
                        data: [28, 72],
                        backgroundColor: ['#06b6d4', '#e2e8f0'], // Cyan-500 & Slate-200
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, boxWidth: 8 } },
                        datalabels: {
                            display: true,
                            color: (context) => context.dataIndex === 0 ? '#fff' : '#64748b',
                            font: {size: 14},
                            formatter: (value) => value + '%'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) { return context.label + ': ' + context.parsed + '%'; }
                            }
                        }
                    }
                }
            });

            // --- Chart 7: Player Geographic Cohorts (Horizontal Bar) ---
            const ctxGeoCohorts = document.getElementById('chart-geo-cohorts').getContext('2d');
            new Chart(ctxGeoCohorts, {
                type: 'bar',
                data: {
                    labels: ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Khác'],
                    datasets: [{
                        label: 'Số lượng người dùng',
                        data: [4250, 1820, 850, 420, 310, 1105],
                        backgroundColor: 'rgba(99, 102, 241, 0.85)', // Indigo-500
                        borderRadius: 4
                    }]
                },
                options: {
                    indexAxis: 'y', // Horizontal
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false },
                        datalabels: {
                            display: true,
                            anchor: 'end',
                            align: 'right',
                            color: '#4f46e5',
                            formatter: (value) => value.toLocaleString()
                        }
                    },
                    scales: {
                        x: { beginAtZero: true, grid: { borderDash: [4, 4] }, grace: '20%' },
                        y: { grid: { display: false } }
                    },
                    layout: { padding: { right: 40 } }
                }
            });

        });
    

// --- page4 script ---

        // Kích hoạt Datalabels mặc định
        
         // Tắt mặc định, bật riêng từng biểu đồ

        document.addEventListener('DOMContentLoaded', function() {
            
            // Reusable sparkline function
            const labelsSparkline = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07', '08/07', '09/07', '10/07', '11/07', '12/07', '13/07', '14/07', '15/07'];
            
            function createSparkline(chartId, data, color) {
                const ctxSpark = document.getElementById(chartId).getContext('2d');
                new Chart(ctxSpark, {
                    type: 'line',
                    data: {
                        labels: labelsSparkline,
                        datasets: [{
                            data: data,
                            borderColor: color,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            pointHoverRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { enabled: false }, datalabels: { display: false } },
                        scales: { x: { display: false }, y: { display: false, beginAtZero: false } },
                        layout: { padding: 0 }
                    }
                });
            }

            // Create Sparklines
            const startsTrend = [210, 225, 215, 240, 260, 280, 275, 290, 310, 295, 320, 315, 305, 330, 350];
            createSparkline('sparkline-starts', startsTrend, '#3b82f6'); // Blue
            
            const finishesTrend = [85, 95, 90, 110, 125, 140, 120, 115, 130, 145, 160, 150, 140, 165, 175];
            createSparkline('sparkline-finishes', finishesTrend, '#10b981'); // Emerald


            // Chart: Gateway Tappoint Share (Pie Chart)
            const ctxGateway = document.getElementById('chart-gateway').getContext('2d');
            new Chart(ctxGateway, {
                type: 'doughnut',
                data: {
                    labels: ['Quảng Trường (Cổng chính)', 'Nhà Hát', 'Khu Khảo Cổ', 'Vườn Bí Mật'],
                    datasets: [{
                        data: [65, 20, 10, 5],
                        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'], // Indigo, Emerald, Amber, Pink
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, boxWidth: 8 } },
                        datalabels: {
                            display: true,
                            anchor: 'center',
                            align: 'center',
                            color: '#fff',
                            font: { weight: 'bold', size: 12 },
                            formatter: (value) => value + '%'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) { return context.label + ': ' + context.parsed + '% user chọn quét đầu tiên'; }
                            }
                        }
                    }
                }
            });

        });
    

// --- page5 script ---

        const colors = {
            primary: '#3b82f6', // Blue
            secondary: '#10b981', // Emerald
            warning: '#f59e0b', // Amber
            danger: '#ef4444', // Red
            purple: '#8b5cf6', // Purple
            gray: '#cbd5e1'
        };

        document.addEventListener('DOMContentLoaded', function() {
            initChart1();
            initChart2();
            initChart3();
        });

        // Tự động resize biểu đồ khi thay đổi kích thước cửa sổ
        window.addEventListener('resize', function() {
            echarts.getInstanceByDom(document.getElementById('chart1'))?.resize();
            echarts.getInstanceByDom(document.getElementById('chart2'))?.resize();
            echarts.getInstanceByDom(document.getElementById('chart3'))?.resize();
        });

        function initChart1() {
            const chart = echarts.init(document.getElementById('chart1'));
            const stations = ['Cổng Chính', 'Nhà Hàng', 'Khu Vườn Cổ', 'Bãi Đỗ Xe', 'Đỉnh Đồi (Khuất)'];
            const avgLatency = [1.2, 1.8, 4.5, 2.1, 9.5];

            const option = {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                legend: { data: ['Độ Trễ Trung Bình (s)'], bottom: 0 },
                grid: { left: '3%', right: '4%', bottom: '15%', top: '5%', containLabel: true },
                xAxis: { type: 'category', data: stations, axisLabel: { rotate: 20, fontSize: 11, color: '#475569', fontWeight: 500 } },
                yAxis: { type: 'value', name: 'Giây (s)', nameTextStyle: { color: '#64748b' } },
                series: [
                    {
                        name: 'Độ Trễ Trung Bình (s)',
                        type: 'bar',
                        data: avgLatency,
                        barWidth: '45%',
                        label: { 
                            show: true, 
                            position: 'top',
                            formatter: '{c}s',
                            color: '#475569',
                            fontWeight: 'bold'
                        },
                        itemStyle: { 
                            color: function(params) {
                                return params.value > 5 ? colors.danger : (params.value > 3 ? colors.warning : colors.primary);
                            },
                            borderRadius: [4, 4, 0, 0] 
                        }
                    }
                ]
            };
            chart.setOption(option);
        }

        function initChart2() {
            const chart = echarts.init(document.getElementById('chart2'));
            const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
            const avgLatency = [1.0, 0.9, 0.8, 0.8, 0.9, 1.1, 1.5, 2.5, 3.2, 4.8, 5.5, 6.2, 5.8, 4.5, 3.5, 3.0, 4.2, 6.8, 7.5, 6.0, 4.0, 2.5, 1.5, 1.1];
            
            const option = {
                tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: {c}s' },
                grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
                xAxis: { 
                    type: 'category', 
                    boundaryGap: false, 
                    data: hours,
                    axisLabel: { interval: 2, fontSize: 11, color: '#475569' }
                },
                yAxis: { type: 'value', name: 'Giây (s)', nameTextStyle: { color: '#64748b' } },
                visualMap: {
                    show: false,
                    pieces: [
                        { gt: 0, lte: 3, color: colors.secondary },
                        { gt: 3, lte: 5, color: colors.warning },
                        { gt: 5, color: colors.danger }
                    ]
                },
                series: [{
                    name: 'Độ Trễ Tải Trang',
                    type: 'line',
                    smooth: true,
                    data: avgLatency,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { width: 3 }
                }]
            };
            chart.setOption(option);
        }

        function initChart3() {
            const chart = echarts.init(document.getElementById('chart3'));
            // [Latency (X), Dwell Time (Y), Station Name, Sample Size]
            const scatterData = [
                [1.2, 180, 'Cổng Chính', 500],
                [1.5, 210, 'Nhà Hàng', 450],
                [2.1, 150, 'Bãi Đỗ Xe', 300],
                [3.5, 110, 'Khu Vui Chơi', 400],
                [4.5, 80, 'Khu Vườn Cổ', 250],
                [6.5, 45, 'Hang Động', 150],
                [8.2, 30, 'Đường Mòn', 100],
                [9.5, 15, 'Đỉnh Đồi (Khuất sóng)', 80]
            ];

            const option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: '#cbd5e1',
                    textStyle: { color: '#334155' },
                    formatter: function (params) {
                        return `<div class="font-bold border-b border-slate-200 pb-1 mb-1">${params.data[2]}</div>
                                Độ Trễ (Ping): <span class="font-semibold text-rose-500">${params.data[0]}s</span><br/>
                                Dừng Chân: <span class="font-semibold text-blue-500">${params.data[1]}s</span><br/>
                                Số Lượng Mẫu: <span class="font-semibold">${params.data[3]}</span>`;
                    }
                },
                grid: { left: '3%', right: '7%', bottom: '10%', top: '10%', containLabel: true },
                xAxis: { 
                    type: 'value', 
                    name: 'Độ Trễ Tải Trang (Giây)', 
                    nameLocation: 'middle', 
                    nameGap: 25,
                    nameTextStyle: { color: '#475569', fontWeight: 500 },
                    splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }
                },
                yAxis: { 
                    type: 'value', 
                    name: 'Thời Gian Dừng (Giây)',
                    nameTextStyle: { color: '#475569', fontWeight: 500 },
                    splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }
                },
                series: [{
                    type: 'scatter',
                    symbolSize: function (data) { return Math.sqrt(data[3]) * 1.8; },
                    data: scatterData,
                    label: {
                        show: true,
                        formatter: function(param) { return param.data[2]; },
                        position: 'top',
                        color: '#475569',
                        fontSize: 10
                    },
                    itemStyle: {
                        color: function(params) {
                            return params.value[0] > 5 ? 'rgba(239, 68, 68, 0.75)' : 'rgba(59, 130, 246, 0.75)';
                        },
                        borderColor: '#fff',
                        borderWidth: 1.5,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.1)'
                    }
                }]
            };
            chart.setOption(option);
        }
    

        
        // Show Page 1 by default
        document.addEventListener('DOMContentLoaded', function() {
            switchTab('tab-page1');
        });
    