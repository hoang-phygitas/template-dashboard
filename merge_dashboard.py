import os
import re

def main():
    project_dir = r"C:\Users\hoang\.gemini\antigravity\scratch\dashboard_project"
    pages = ["page1.html", "page2.html", "page3.html", "page4.html", "page5.html"]
    
    menu_titles = [
        "Journey Overview",
        "On-Site Interaction",
        "Cohorts & Behaviors",
        "O2O Funnel",
        "GPS & Network"
    ]
    menu_icons = [
        "fa-map-location-dot",
        "fa-hand-pointer",
        "fa-users-viewfinder",
        "fa-filter",
        "fa-satellite-dish"
    ]

    combined_styles = ""
    tabs_html = ""
    combined_scripts = ""
    menu_html = ""

    for i, file_name in enumerate(pages):
        page_id = f"page{i+1}"
        file_path = os.path.join(project_dir, file_name)
        
        if not os.path.exists(file_path):
            print(f"File {file_path} not found.")
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # 1. Extract CSS
        style_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
        if style_match:
            raw_style = style_match.group(1)
            raw_style = re.sub(r"body\s*\{.*?\}", "", raw_style, flags=re.DOTALL)
            raw_style = re.sub(r"::-webkit-scrollbar.*?\{.*?\}", "", raw_style, flags=re.DOTALL)
            combined_styles += f"\n/* --- {page_id} --- */\n{raw_style}\n"
            
        # 2. Extract HTML Body Content
        body_match = re.search(r"<body[^>]*>(.*?)</body>", content, re.DOTALL)
        if body_match:
            body_content = body_match.group(1)
            # Find all script tags in the body and remove them
            body_content = re.sub(r"<script.*?</script>", "", body_content, flags=re.DOTALL)
            # Add to tabs wrapper
            tabs_html += f'<div id="tab-{page_id}" class="tab-content" style="display: none;">\n{body_content}\n</div>\n'
            
        # 3. Extract Javascript
        # Extract everything inside the LAST script tag (usually the main one)
        scripts = re.findall(r"<script>(.*?)</script>", content, re.DOTALL)
        if scripts:
            main_script = scripts[-1] # The last one is the Chart logic
            # Remove duplicate Chart.register and Chart.defaults to avoid global conflicts
            main_script = re.sub(r"Chart\.register\(.*?\);", "", main_script)
            main_script = re.sub(r"Chart\.defaults.*?=.*?;", "", main_script)
            
            # Remove DOMContentLoaded wrapper entirely to inline it
            # We'll match everything inside the outermost document.addEventListener
            # Since Regex is bad at nested brackets, we will just keep the original DOMContentLoaded!
            # Having multiple DOMContentLoaded listeners is 100% valid in JS.
            combined_scripts += f"\n// --- {page_id} script ---\n{main_script}\n"
                
        # 4. Generate Menu HTML
        active_classes = "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" if i == 0 else "text-slate-400 hover:bg-slate-800 hover:text-white"
        menu_html += f'''
                <button id="nav-tab-{page_id}" onclick="switchTab('tab-{page_id}')" class="menu-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm {active_classes}">
                    <i class="fa-solid {menu_icons[i]} w-5 text-center text-lg"></i> 
                    <span>{menu_titles[i]}</span>
                </button>
        '''

    master_template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>O2O Analytics Dashboard</title>
    
    <!-- Dependencies -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Charts -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
    
    <style>
        body {{
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6; /* Gray-100 */
        }}
        
        /* Custom scrollbar for entire page */
        ::-webkit-scrollbar {{ width: 8px; height: 8px; }}
        ::-webkit-scrollbar-track {{ background: transparent; }}
        ::-webkit-scrollbar-thumb {{ background: #cbd5e1; border-radius: 4px; }}
        ::-webkit-scrollbar-thumb:hover {{ background: #94a3b8; }}
        
        .tab-content {{
            animation: fadeIn 0.4s ease-out forwards;
        }}
        
        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(10px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
        
        {combined_styles}
    </style>
</head>
<body class="flex h-screen overflow-hidden bg-slate-100 text-slate-800">

    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex shrink-0 shadow-xl z-20">
        <!-- Logo -->
        <div class="p-6 flex items-center gap-3 text-white border-b border-slate-800/60">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg">
                <i class="fa-solid fa-bolt"></i>
            </div>
            <div>
                <h2 class="font-bold text-xl tracking-tight leading-tight">O2O Admin</h2>
                <p class="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold mt-0.5">Analytics Portal</p>
            </div>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 py-8 flex flex-col gap-2 px-4 overflow-y-auto">
            <p class="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
            {menu_html}
        </nav>
        
        <!-- User Profile (Mock) -->
        <div class="p-4 border-t border-slate-800/60 m-4 rounded-xl bg-slate-800/50 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=475569&color=fff" alt="Admin">
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-white truncate">Admin Manager</p>
                <p class="text-xs text-emerald-400 font-medium">Online</p>
            </div>
        </div>
    </aside>

    <!-- Main View -->
    <main class="flex-1 flex flex-col h-screen relative overflow-hidden">
        
        <!-- Mobile Header -->
        <div class="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between z-30 shadow-md">
            <div class="flex items-center gap-2 font-bold text-lg">
                <i class="fa-solid fa-bolt text-indigo-400"></i> O2O Admin
            </div>
            <button class="text-slate-300 hover:text-white p-2" onclick="alert('Tính năng menu mobile đang hoàn thiện.')">
                <i class="fa-solid fa-bars text-xl"></i>
            </button>
        </div>
        
        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-y-auto p-0 relative" id="scroll-container">
            {tabs_html}
        </div>
    </main>

    <script>
        // --- 1. Global Chart Settings ---
        Chart.register(ChartDataLabels);
        Chart.defaults.plugins.datalabels.color = '#475569';
        Chart.defaults.plugins.datalabels.font = {{ weight: 'bold' }};
        
        // --- 2. Tab Switching Logic ---
        function switchTab(tabId) {{
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(el => {{
                el.style.display = 'none';
            }});
            
            // Reset all menu items
            document.querySelectorAll('.menu-item').forEach(el => {{
                el.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
                el.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
            }});
            
            // Show selected tab
            document.getElementById(tabId).style.display = 'block';
            
            // Highlight selected menu item
            const navItem = document.getElementById('nav-' + tabId);
            if (navItem) {{
                navItem.classList.remove('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
                navItem.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
            }}
            
            // Scroll to top of the container
            document.getElementById('scroll-container').scrollTop = 0;
            
            // Trigger window resize to force Chart.js and ECharts to re-render properly in the new visible container
            setTimeout(() => {{
                window.dispatchEvent(new Event('resize'));
            }}, 50);
        }}

        // --- 3. Page Scripts Execution ---
        {combined_scripts}
        
        // Show Page 1 by default
        document.addEventListener('DOMContentLoaded', function() {{
            switchTab('tab-page1');
        }});
    </script>
</body>
</html>
"""

    with open(os.path.join(project_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(master_template)

    print("Successfully generated index.html")

if __name__ == "__main__":
    main()
