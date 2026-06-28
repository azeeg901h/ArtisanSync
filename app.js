'use strict';

class ArtisanSyncEngine {

    constructor() {
        this.currentUser   = null;
        this.currentRole   = null;
        this.activeProjects = [];
        this.lastLedger    = null;
        this.ledgerHistory = [];

        this.artisanDatabase = [
            { id:1,  name:"Chukwuemeka Okafor",  specialty:"painter",     type:"Painter",            location:"Lagos",         city:"Surulere, Lagos",      rate:25000, rating:4.9, jobs:87,  avatar:"🎨", available:true,  tags:["Interior Finish","Emulsion","Texcote","Satin"],              bio:"12 years experience on high-end residential and commercial projects across Lagos.",                          portfolio:["Eko Atlantic Luxury Apartments","VI Corporate Tower","Lekki Phase 1 Estate"] },
            { id:2,  name:"Musa Abdullahi",       specialty:"freight",     type:"Freight Operator",   location:"Abuja",         city:"Wuse II, Abuja",       rate:35000, rating:4.8, jobs:143, avatar:"🚛", available:true,  tags:["Heavy Haulage","Interstate","Lagos-Abuja","Fragile Cargo"],  bio:"Licensed fleet operator covering all major Nigerian corridors with 10-tonne capacity.",                     portfolio:["Dangote Cement Supply","Julius Berger Materials","FHA Estate Delivery"] },
            { id:3,  name:"Biodun Adeyemi",       specialty:"machinist",   type:"Structural Machinist",location:"Lagos",         city:"Apapa, Lagos",         rate:45000, rating:4.7, jobs:62,  avatar:"⚙️", available:true,  tags:["Steel Fabrication","Roofing","Structural Welding","Industrial"],bio:"Certified structural engineer specialising in commercial steel installations.",                               portfolio:["Apapa Port Steel Works","Ikeja Industrial Park","Lagos Bridge Reinforcement"] },
            { id:4,  name:"Amara Nwosu",          specialty:"painter",     type:"Painter",            location:"Port Harcourt", city:"GRA Phase 2, PH",      rate:22000, rating:4.6, jobs:54,  avatar:"🖌️", available:true,  tags:["Exterior Walls","Waterproofing","Block Rendering","Oil Paint"],bio:"Specialises in exterior weatherproofing and block-work painting across Rivers State.",                        portfolio:["SPDC GRA Quarters","PH Mall Exterior","Trans-Amadi Factory Complex"] },
            { id:5,  name:"Ibrahim Suleiman",     specialty:"freight",     type:"Freight Operator",   location:"Lagos",         city:"Apapa, Lagos",         rate:40000, rating:4.9, jobs:210, avatar:"🚚", available:false, tags:["Port Clearance","Container Haulage","Bonded Warehouse","Bulk"], bio:"Port-certified freight operator with specialised experience in Apapa corridor logistics.",                   portfolio:["Tin Can Port Operations","Apapa Container Terminal","Wharf Road Industrial"] },
            { id:6,  name:"Tunde Fashola",        specialty:"machinist",   type:"Structural Machinist",location:"Ibadan",        city:"Bodija, Ibadan",       rate:38000, rating:4.5, jobs:39,  avatar:"🔩", available:true,  tags:["Gate Fabrication","Burglary Proof","Staircase","Iron Bending"], bio:"Expert in custom gate, staircase, and security door fabrication for residential estates.",                   portfolio:["UI Staff Quarters Gates","Bodija Estate Doors","Ring Road Commercial Complex"] },
            { id:7,  name:"Ngozi Eze",            specialty:"painter",     type:"Painter",            location:"Abuja",         city:"Maitama, Abuja",       rate:28000, rating:4.8, jobs:71,  avatar:"🎨", available:true,  tags:["Luxury Interior","Wallpaper","Decorative Finish","Gloss Enamel"],bio:"High-end interior painter for luxury properties and government buildings in Abuja.",                         portfolio:["Maitama Ambassadorial Lodge","Wuse Zone 4 Offices","Asokoro Quarters"] },
            { id:8,  name:"Emeka Obi",            specialty:"freight",     type:"Freight Operator",   location:"Port Harcourt", city:"Trans-Amadi, PH",      rate:32000, rating:4.6, jobs:98,  avatar:"🛻", available:true,  tags:["Oil Sector","Industrial Haulage","Offshore Supply","Delta"],    bio:"Experienced in oil sector logistics and heavy industrial haulage across the Niger Delta.",                   portfolio:["Chevron Logistics PH","Warri Refinery Supply","Bonny Island Materials"] },
            { id:9,  name:"Yusuf Garba",          specialty:"machinist",   type:"Structural Machinist",location:"Abuja",         city:"Karu, Abuja",          rate:42000, rating:4.7, jobs:55,  avatar:"⚙️", available:true,  tags:["Roofing Sheets","PVC Ceiling","False Ceiling","Aluminum"],      bio:"Specialist in aluminum roofing systems and false ceiling installations for commercial builds.",              portfolio:["Karu New Estate Roofing","Nyanya Shopping Mall","Mararaba Commercial Block"] },
            { id:10, name:"Seun Balogun",         specialty:"electrician", type:"Electrician",        location:"Lagos",         city:"Ikeja, Lagos",         rate:28000, rating:4.8, jobs:112, avatar:"⚡", available:true,  tags:["Wiring","Solar Installation","Generator","Industrial"],         bio:"Certified electrician with expertise in residential wiring, solar systems, and industrial panels.",          portfolio:["Ikeja GRA Solar Project","Allen Avenue Commercial Wiring","Alausa Secretariat"] },
            { id:11, name:"Chioma Okonkwo",       specialty:"tiler",       type:"Tiler",              location:"Lagos",         city:"Victoria Island, Lagos",rate:20000, rating:4.7, jobs:83,  avatar:"🏠", available:true,  tags:["Floor Tiling","Wall Tiling","Marble","Granite"],               bio:"Expert tiler specialising in luxury marble and granite installations for high-end properties.",              portfolio:["VI Luxury Penthouse","Eko Hotel Extension","Oniru Private Estate"] },
            { id:12, name:"Aliyu Bello",          specialty:"welder",      type:"Welder",             location:"Kano",          city:"Sabon Gari, Kano",     rate:30000, rating:4.6, jobs:67,  avatar:"🔥", available:true,  tags:["Arc Welding","Pipeline","Tank Fabrication","Structural"],       bio:"Industrial welder with 15 years experience in pipeline welding and tank fabrication in northern Nigeria.", portfolio:["Kano Water Board Pipeline","BUA Flour Mills Tank","Challawa Industrial Estate"] },
            { id:13, name:"Funke Adeleke",        specialty:"plumber",     type:"Plumber",            location:"Lagos",         city:"Lekki, Lagos",         rate:22000, rating:4.5, jobs:91,  avatar:"🔧", available:false, tags:["Pipe Fitting","Borehole","Sanitary","Swimming Pool"],           bio:"Licensed plumber covering all sanitary installations, borehole systems, and swimming pool plumbing.",       portfolio:["Lekki Phase 1 Borehole","Ajah Estate Swimming Pool","Chevron Drive Plumbing"] },
            { id:14, name:"Dele Ogundimu",        specialty:"carpenter",   type:"Carpenter",          location:"Ibadan",        city:"Ring Road, Ibadan",    rate:18000, rating:4.6, jobs:104, avatar:"🪵", available:true,  tags:["Furniture","Roofing","Doors","Wardrobes"],                      bio:"Master carpenter crafting custom furniture, fitted wardrobes, and structural roofing across Oyo State.",    portfolio:["Bodija Luxury Villa Furniture","UI Senate Building Doors","Jericho Estate Wardrobes"] },
            { id:15, name:"Haruna Musa",          specialty:"mason",       type:"Mason",              location:"Abuja",         city:"Nyanya, Abuja",        rate:15000, rating:4.4, jobs:156, avatar:"🧱", available:true,  tags:["Block Laying","Plastering","Screeding","Foundation"],           bio:"Experienced mason specialising in block laying, plastering, and foundation work for large estates.",        portfolio:["Kubwa Estate Block Work","Lugbe Housing Project","Nyanya Commercial Plaza"] }
        ];

        this.specialtyRates = {
            painter:     { label:"Painter",            rate:25000 },
            freight:     { label:"Freight Operator",   rate:35000 },
            machinist:   { label:"Structural Machinist",rate:45000 },
            tiler:       { label:"Tiler",              rate:20000 },
            welder:      { label:"Welder",             rate:30000 },
            electrician: { label:"Electrician",        rate:28000 },
            plumber:     { label:"Plumber",            rate:22000 },
            carpenter:   { label:"Carpenter",          rate:18000 },
            mason:       { label:"Mason",              rate:15000 },
            other:       { label:"Other Specialist",   rate:20000 }
        };

        this.bindEvents();
    }

    /* ── EVENTS ─────────────────────────────────────── */
    bindEvents() {
        const haulage = document.getElementById('esc-haulage');
        if (haulage) {
            haulage.addEventListener('change', () => {
                const note = document.getElementById('haulage-note');
                if (note) haulage.checked ? note.classList.remove('auth-hidden') : note.classList.add('auth-hidden');
            });
        }

        const spec = document.getElementById('esc-specialty');
        if (spec) spec.addEventListener('change', () => this.handleSpecialtyChange());

        const days = document.getElementById('esc-days');
        if (days) {
            days.addEventListener('input', () => {
                const v = parseInt(days.value);
                days.style.borderColor = (!v || v < 1 || v > 365) ? '#e03040' : '';
            });
        }
    }

    handleSpecialtyChange() {
        const val = document.getElementById('esc-specialty').value;
        const row = document.getElementById('custom-specialty-row');
        if (row) row.style.display = val === 'other' ? 'flex' : 'none';
    }

    /* ── AUTH ───────────────────────────────────────── */
    showSignIn() {
        document.getElementById('signup-form').classList.add('auth-hidden');
        document.getElementById('signin-form').classList.remove('auth-hidden');
        this.clearErrors();
    }

    showSignUp() {
        document.getElementById('signin-form').classList.add('auth-hidden');
        document.getElementById('signup-form').classList.remove('auth-hidden');
        this.clearErrors();
    }

    clearErrors() {
        document.querySelectorAll('.input-error').forEach(e => e.textContent = '');
        document.querySelectorAll('.auth-input-row input').forEach(i => i.style.borderColor = '');
    }

    signUp() {
        const name     = document.getElementById('signup-name').value.trim();
        const email    = document.getElementById('signup-email').value.trim();
        const phone    = document.getElementById('signup-phone').value.trim();
        const password = document.getElementById('signup-password').value;

        let valid = true;

        if (!name || name.length < 2) {
            document.getElementById('name-error').textContent = 'Please enter your full name.';
            document.getElementById('signup-name').style.borderColor = '#e03040';
            valid = false;
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            document.getElementById('signup-email').style.borderColor = '#e03040';
            valid = false;
        }

        if (!phone || phone.replace(/\D/g,'').length < 10) {
            document.getElementById('phone-error').textContent = 'Please enter a valid phone number.';
            document.getElementById('signup-phone').style.borderColor = '#e03040';
            valid = false;
        }

        if (!password || password.length < 6) {
            document.getElementById('password-error').textContent = 'Password must be at least 6 characters.';
            document.getElementById('signup-password').style.borderColor = '#e03040';
            valid = false;
        }

        if (!valid) return;

        // Save user to memory
        this.currentUser = {
            name, email, phone,
            password,
            joined: new Date().toLocaleDateString('en-NG', { day:'numeric', month:'long', year:'numeric' })
        };

        this.goToRoleGate();
    }

    signIn() {
        const email    = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;
        let valid = true;

        if (!email) {
            document.getElementById('signin-email-error').textContent = 'Please enter your email.';
            document.getElementById('signin-email').style.borderColor = '#e03040';
            valid = false;
        }

        if (!password) {
            document.getElementById('signin-password-error').textContent = 'Please enter your password.';
            document.getElementById('signin-password').style.borderColor = '#e03040';
            valid = false;
        }

        if (!valid) return;

        // Check if user exists in memory
        if (this.currentUser && email === this.currentUser.email && password === this.currentUser.password) {
            // Return to their dashboard
            document.getElementById('auth-screen').style.display = 'none';
            if (this.currentRole) {
                document.getElementById('role-gate').classList.add('auth-hidden');
                document.getElementById('main-app').classList.remove('auth-hidden');
            } else {
                this.goToRoleGate();
            }
        } else {
            document.getElementById('signin-email-error').textContent = 'No account found. Please sign up first.';
            document.getElementById('signin-email').style.borderColor = '#e03040';
        }
    }

    goToRoleGate() {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('role-gate').classList.remove('auth-hidden');

        // Personalise the greeting
        if (this.currentUser) {
            const firstName = this.currentUser.name.split(' ')[0];
            const greeting  = document.getElementById('role-gate-greeting');
            if (greeting) greeting.textContent = `Welcome, ${firstName}. Who are you joining as?`;
        }
    }

    logOut() {
        this.currentRole = null;
        document.getElementById('main-app').classList.add('auth-hidden');
        document.getElementById('role-gate').classList.add('auth-hidden');
        document.getElementById('auth-screen').style.display = 'flex';
        // Show signup by default on logout
        document.getElementById('signup-form').classList.remove('auth-hidden');
        document.getElementById('signin-form').classList.add('auth-hidden');
        this.clearErrors();
    }

    /* ── ROLE SELECTION ─────────────────────────────── */
    selectRole(role) {
        this.currentRole = role;
        document.getElementById('role-gate').classList.add('auth-hidden');
        document.getElementById('main-app').classList.remove('auth-hidden');

        const badge = document.getElementById('role-badge');
        badge.textContent = role === 'client' ? 'Client' : 'Artisan';

        this.renderDiscoverTab();
        this.renderProjectsTab();
        this.updateProfileTab();
        this.switchTab('discover');
    }

    /* ── TABS ───────────────────────────────────────── */
    switchTab(tab) {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active-panel'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active-panel');
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    }

    /* ── AI RECOMMENDATION ──────────────────────────── */
    async getAISuggestion() {
        const input  = document.getElementById('ai-project-input');
        const btn    = document.getElementById('ai-suggest-btn');
        const result = document.getElementById('ai-suggest-result');
        const query  = input.value.trim();

        if (!query) { alert('Please describe your project first.'); return; }

        btn.textContent = 'Thinking...';
        btn.disabled    = true;
        result.style.display = 'none';

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-6',
                    max_tokens: 1000,
                    messages: [{
                        role: 'user',
                        content: `You are a helpful assistant for ArtisanSync, a Nigerian B2B marketplace connecting clients with skilled professionals. 
                        
A client described their project as: "${query}"

Based on this, recommend which type of professional(s) they need from this list: Painter, Freight Operator, Structural Machinist, Electrician, Tiler, Welder, Plumber, Carpenter, Mason.

Give a short, friendly, plain-English response (2-3 sentences max). Name the professional type clearly, briefly explain why, and mention a rough daily rate in Naira if relevant. Do not use bullet points or headers.`
                    }]
                })
            });

            const data = await response.json();
            const text = data.content?.[0]?.text || 'Sorry, I could not generate a suggestion right now. Please try again.';

            result.innerHTML = `<span style="color:var(--accent);font-weight:700;">🤖 AI Suggestion:</span><br><br>${text}`;
            result.style.display = 'block';

        } catch (err) {
            result.innerHTML = `<span style="color:var(--error);">Could not reach AI right now. Please check your connection and try again.</span>`;
            result.style.display = 'block';
        }

        btn.textContent = 'Ask AI →';
        btn.disabled    = false;
    }

    /* ── DISCOVER ───────────────────────────────────── */
    renderDiscoverTab() { this.filterArtisans(); }

    filterArtisans() {
        const specialty = document.getElementById('filter-specialty').value;
        const location  = document.getElementById('filter-location').value;
        const rate      = document.getElementById('filter-rate').value;

        let filtered = this.artisanDatabase.filter(a => {
            const matchSpec = specialty === 'all' || a.specialty === specialty;
            const matchLoc  = location  === 'all' || a.location  === location;
            let   matchRate = true;
            if (rate === 'low')  matchRate = a.rate < 20000;
            if (rate === 'mid')  matchRate = a.rate >= 20000 && a.rate <= 40000;
            if (rate === 'high') matchRate = a.rate > 40000;
            return matchSpec && matchLoc && matchRate;
        });

        const grid = document.getElementById('artisan-grid');
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-results"><span>🔍</span><p>No professionals match your filters. Try adjusting your search.</p></div>`;
            return;
        }

        filtered.forEach(a => {
            const card = document.createElement('div');
            card.className = 'artisan-card';
            card.innerHTML = `
                <div class="artisan-card-header">
                    <div class="artisan-avatar">${a.avatar}</div>
                    <div class="artisan-meta">
                        <h4>${a.name}</h4>
                        <span>${a.type}</span>
                    </div>
                    <div class="verified-badge">✓ Verified</div>
                </div>
                <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:14px;line-height:1.6;">${a.bio}</p>
                <div class="artisan-stats">
                    <div class="stat-pill"><span class="stat-label">Daily Rate</span><span class="stat-value">₦${a.rate.toLocaleString()}</span></div>
                    <div class="stat-pill"><span class="stat-label">Location</span><span class="stat-value">${a.city}</span></div>
                    <div class="stat-pill"><span class="stat-label">Rating</span><span class="stat-value">⭐ ${a.rating}/5</span></div>
                    <div class="stat-pill"><span class="stat-label">Jobs Done</span><span class="stat-value">${a.jobs}+</span></div>
                </div>
                <div class="artisan-tags">${a.tags.map(t => `<span class="artisan-tag">${t}</span>`).join('')}</div>
                <div class="portfolio-preview">
                    <span class="portfolio-label">Recent Projects</span>
                    <div class="portfolio-list">${a.portfolio.map(p => `<span class="portfolio-item">📌 ${p}</span>`).join('')}</div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;margin:12px 0;">
                    <span style="width:8px;height:8px;border-radius:50%;background:${a.available ? 'var(--success)' : 'var(--text-muted)'};display:inline-block;box-shadow:${a.available ? '0 0 8px var(--accent)' : 'none'};flex-shrink:0;"></span>
                    <span style="font-size:0.77rem;color:${a.available ? 'var(--success)' : 'var(--text-muted)'};">${a.available ? 'Available Now' : 'Currently Booked'}</span>
                </div>
                <button class="book-btn" onclick="App.openBookingDeck(${a.id})" ${!a.available ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                    ${a.available ? '📋 Open Booking Deck' : 'Currently Unavailable'}
                </button>
            `;
            grid.appendChild(card);
        });
    }

    openBookingDeck(id) {
        const a = this.artisanDatabase.find(x => x.id === id);
        if (!a) return;
        const sel = document.getElementById('esc-specialty');
        if (sel && this.specialtyRates[a.specialty]) {
            sel.value = a.specialty;
            this.handleSpecialtyChange();
        }
        this.switchTab('escrow');
    }

    /* ── PROJECTS ───────────────────────────────────── */
    renderProjectsTab() {
        const content = document.getElementById('projects-content');
        const title   = document.getElementById('projects-title');
        const sub     = document.getElementById('projects-subtitle');

        title.textContent = this.currentRole === 'artisan' ? 'My Active Bookings' : 'Active Projects';
        sub.textContent   = this.currentRole === 'artisan'
            ? 'Your current project engagements and earnings.'
            : 'All your active bookings and total money committed.';

        if (this.activeProjects.length === 0) {
            content.innerHTML = `<div class="projects-empty"><span>📁</span><h3>No active projects yet</h3><p>Calculate a cost in the Cost Calculator tab and confirm a booking to see it here.</p></div>`;
            return;
        }

        content.innerHTML = '';

        const total     = this.activeProjects.reduce((s,p) => s + p.total, 0);
        const totalDays = this.activeProjects.reduce((s,p) => s + p.days, 0);

        const stats = document.createElement('div');
        stats.className = 'artisan-dashboard-grid';
        stats.innerHTML = `
            <div class="dashboard-stat-card"><span class="stat-num">${this.activeProjects.length}</span><span class="stat-desc">${this.currentRole === 'artisan' ? 'Active Bookings' : 'Active Projects'}</span></div>
            <div class="dashboard-stat-card"><span class="stat-num">₦${total.toLocaleString()}</span><span class="stat-desc">${this.currentRole === 'artisan' ? 'Total Earnings' : 'Total Budget Committed'}</span></div>
            <div class="dashboard-stat-card"><span class="stat-num">${totalDays}</span><span class="stat-desc">Total Project Days</span></div>
        `;
        content.appendChild(stats);

        this.activeProjects.forEach((p, i) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-status-dot"></div>
                <div class="project-info">
                    <h4>${p.specialty}</h4>
                    <p>${p.days} day project${p.logistics > 0 ? ' • With delivery' : ''}${p.haulage ? ' • Bulk materials' : ''}${p.discount > 0 ? ' • 10% discount applied' : ''}</p>
                </div>
                <span class="project-days-badge">${p.days} days</span>
                <span class="project-total">₦${p.total.toLocaleString()}</span>
                <button onclick="App.removeProject(${i})" style="background:rgba(224,48,64,0.1);border:1px solid rgba(224,48,64,0.3);border-radius:8px;padding:6px 10px;cursor:pointer;color:#e03040;font-size:0.8rem;transition:var(--transition);">Remove</button>
            `;
            content.appendChild(card);
        });

        if (this.ledgerHistory.length > 0) {
            const hist = document.createElement('div');
            hist.style.marginTop = '28px';
            hist.innerHTML = `<h3 style="font-size:0.76rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-secondary);margin-bottom:14px;">Quote History</h3>`;
            this.ledgerHistory.forEach((e, i) => {
                const row = document.createElement('div');
                row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:11px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;font-size:0.83rem;';
                row.innerHTML = `<span style="color:var(--text-secondary);">#${i+1} — ${e.specialty}</span><span style="color:var(--text-secondary);">${e.days} days</span><span style="color:var(--accent);font-weight:700;">₦${e.total.toLocaleString()}</span>`;
                hist.appendChild(row);
            });
            content.appendChild(hist);
        }
    }

    removeProject(i) {
        this.activeProjects.splice(i, 1);
        this.renderProjectsTab();
    }

    /* ── PROFILE ────────────────────────────────────── */
    updateProfileTab() {
        if (!this.currentUser) return;
        const u = this.currentUser;
        const firstName = u.name.split(' ')[0];
        const initials  = u.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

        const avatar = document.getElementById('profile-avatar');
        if (avatar) avatar.textContent = initials;

        const nameDisplay = document.getElementById('profile-name-display');
        if (nameDisplay) nameDisplay.textContent = u.name;

        const roleDisplay = document.getElementById('profile-role-display');
        if (roleDisplay) { roleDisplay.textContent = this.currentRole === 'client' ? 'Client' : 'Artisan'; }

        const fields = { 'pd-name': u.name, 'pd-email': u.email, 'pd-phone': u.phone, 'pd-role': this.currentRole === 'client' ? 'Client' : 'Artisan', 'pd-joined': u.joined };
        for (const [id, val] of Object.entries(fields)) {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        }
    }

    /* ── COST CALCULATOR ────────────────────────────── */
    generateLedger() {
        const specKey   = document.getElementById('esc-specialty').value;
        const daysRaw   = document.getElementById('esc-days').value.trim();
        const logVal    = parseInt(document.getElementById('esc-logistics').value);
        const haulage   = document.getElementById('esc-haulage').checked;
        const customSp  = document.getElementById('esc-custom-specialty') ? document.getElementById('esc-custom-specialty').value.trim() : '';

        if (!daysRaw || isNaN(daysRaw)) { alert('Please enter the number of days for your project.'); return; }
        const days = parseInt(daysRaw);
        if (days < 1 || days > 365) { alert('Project days must be between 1 and 365.'); return; }
        if (specKey === 'other' && !customSp) { alert('Please describe your specialist type in the field below the dropdown.'); return; }

        const spec      = this.specialtyRates[specKey];
        const label     = specKey === 'other' ? customSp : spec.label;
        const base      = spec.rate * days;
        const hasDisc   = days > 10;
        const discount  = hasDisc ? Math.round(base * 0.10) : 0;
        const labor     = base - discount;
        const haulageFee = haulage ? 20000 : 0;
        const total     = labor + logVal + haulageFee;

        this.lastLedger = { specialty:label, days, rate:spec.rate, labor, logistics:logVal, haulage:haulageFee, total, discount };
        this.ledgerHistory.push({ ...this.lastLedger });

        document.getElementById('out-specialty').textContent = label;
        document.getElementById('out-rate').textContent      = `₦${spec.rate.toLocaleString()}/day`;
        document.getElementById('out-days').textContent      = `${days} day${days > 1 ? 's' : ''}`;
        document.getElementById('out-labor').textContent     = `₦${labor.toLocaleString()}`;
        document.getElementById('out-logistics').textContent = `₦${logVal.toLocaleString()}`;
        document.getElementById('out-haulage').textContent   = `₦${haulageFee.toLocaleString()}`;
        document.getElementById('out-total').textContent     = `₦${total.toLocaleString()}`;

        const discRow = document.getElementById('discount-row');
        if (hasDisc) { discRow.style.display = 'flex'; document.getElementById('out-discount').textContent = `-₦${discount.toLocaleString()} saved`; }
        else { discRow.style.display = 'none'; }

        document.getElementById('escrow-empty').classList.add('auth-hidden');
        document.getElementById('escrow-output').classList.remove('auth-hidden');
    }

    confirmBooking() {
        if (!this.lastLedger) return;
        this.activeProjects.push({ ...this.lastLedger });
        this.renderProjectsTab();
        const msg = document.getElementById('modal-message');
        if (msg) msg.textContent = `${this.lastLedger.specialty} project for ${this.lastLedger.days} days added to your active bookings. Total: ₦${this.lastLedger.total.toLocaleString()}.`;
        document.getElementById('booking-modal').classList.remove('auth-hidden');
    }

    closeModal() {
        document.getElementById('booking-modal').classList.add('auth-hidden');
        this.switchTab('projects');
    }
}

const App = new ArtisanSyncEngine();