'use strict';

class ArtisanSyncEngine {

    constructor() {
        this.currentRole = null;
        this.activeProjects = [];
        this.lastLedger = null;

        this.artisanDatabase = [
            {
                id: 1, name: "Chukwuemeka Okafor", specialty: "painter", type: "Premium Painter",
                location: "Lagos", city: "Surulere, Lagos", rate: 25000,
                rating: 4.9, jobs: 87, avatar: "🎨", available: true,
                tags: ["Interior Finish", "Emulsion", "Texcote", "Satin"],
                bio: "12 years experience on high-end residential and commercial projects across Lagos."
            },
            {
                id: 2, name: "Musa Abdullahi", specialty: "freight", type: "Freight Operator",
                location: "Abuja", city: "Wuse II, Abuja", rate: 35000,
                rating: 4.8, jobs: 143, avatar: "🚛", available: true,
                tags: ["Heavy Haulage", "Interstate", "Lagos-Abuja", "Fragile Cargo"],
                bio: "Licensed fleet operator covering all major Nigerian corridors with 10-tonne capacity."
            },
            {
                id: 3, name: "Biodun Adeyemi", specialty: "machinist", type: "Structural Machinist",
                location: "Lagos", city: "Apapa, Lagos", rate: 45000,
                rating: 4.7, jobs: 62, avatar: "⚙️", available: true,
                tags: ["Steel Fabrication", "Roofing", "Structural Welding", "Industrial"],
                bio: "Certified structural engineer and machinist specialising in commercial steel installations."
            },
            {
                id: 4, name: "Amara Nwosu", specialty: "painter", type: "Premium Painter",
                location: "Port Harcourt", city: "GRA Phase 2, PH", rate: 22000,
                rating: 4.6, jobs: 54, avatar: "🖌️", available: true,
                tags: ["Exterior Walls", "Waterproofing", "Block Rendering", "Oil Paint"],
                bio: "Specialises in exterior weatherproofing and block-work painting across Rivers State."
            },
            {
                id: 5, name: "Ibrahim Suleiman", specialty: "freight", type: "Freight Operator",
                location: "Lagos", city: "Apapa, Lagos", rate: 40000,
                rating: 4.9, jobs: 210, avatar: "🚚", available: false,
                tags: ["Port Clearance", "Container Haulage", "Bonded Warehouse", "Bulk Goods"],
                bio: "Port-certified freight operator with specialised experience in Apapa corridor logistics."
            },
            {
                id: 6, name: "Tunde Fashola", specialty: "machinist", type: "Structural Machinist",
                location: "Ibadan", city: "Bodija, Ibadan", rate: 38000,
                rating: 4.5, jobs: 39, avatar: "🔩", available: true,
                tags: ["Gate Fabrication", "Burglary Proof", "Staircase", "Iron Bending"],
                bio: "Expert in custom gate, staircase, and security door fabrication for residential estates."
            },
            {
                id: 7, name: "Ngozi Eze", specialty: "painter", type: "Premium Painter",
                location: "Abuja", city: "Maitama, Abuja", rate: 28000,
                rating: 4.8, jobs: 71, avatar: "🎨", available: true,
                tags: ["Luxury Interior", "Wallpaper", "Decorative Finish", "Gloss Enamel"],
                bio: "High-end interior painter for luxury properties and government buildings in Abuja."
            },
            {
                id: 8, name: "Emeka Obi", specialty: "freight", type: "Freight Operator",
                location: "Port Harcourt", city: "Trans-Amadi, PH", rate: 32000,
                rating: 4.6, jobs: 98, avatar: "🛻", available: true,
                tags: ["Oil Sector", "Industrial Haulage", "Offshore Supply", "Delta Region"],
                bio: "Experienced in oil sector logistics and heavy industrial haulage across the Niger Delta."
            },
            {
                id: 9, name: "Yusuf Garba", specialty: "machinist", type: "Structural Machinist",
                location: "Abuja", city: "Karu, Abuja", rate: 42000,
                rating: 4.7, jobs: 55, avatar: "⚙️", available: true,
                tags: ["Roofing Sheets", "PVC Ceiling", "False Ceiling", "Aluminum"],
                bio: "Specialist in aluminum roofing systems and false ceiling installations for commercial builds."
            }
        ];

        this.specialtyRates = {
            painter:     { label: "Premium Painter",         rate: 25000 },
            freight:     { label: "Freight Operator",        rate: 35000 },
            machinist:   { label: "Structural Machinist",    rate: 45000 },
            tiler:       { label: "Professional Tiler",      rate: 20000 },
            welder:      { label: "Industrial Welder",       rate: 30000 },
            electrician: { label: "Electrician",             rate: 28000 }
        };

        this.bindHaulageToggle();
    }

    /* ── ROLE SELECTION ─────────────────────────────── */
    selectRole(role) {
        this.currentRole = role;
        document.getElementById('role-gate').style.display = 'none';
        document.getElementById('main-app').classList.remove('app-hidden');

        const badge = document.getElementById('role-badge');
        badge.textContent = role === 'client' ? 'Client' : 'Artisan';

        this.renderDiscoverTab();
        this.renderProjectsTab();
        this.switchTab('discover');
    }

    switchRole() {
        document.getElementById('role-gate').style.display = 'flex';
        document.getElementById('main-app').classList.add('app-hidden');
        this.currentRole = null;
    }

    /* ── TAB SWITCHING ──────────────────────────────── */
    switchTab(tab) {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active-panel'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active-panel');
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    }

    /* ── DISCOVER / ARTISAN GRID ────────────────────── */
    renderDiscoverTab() {
        this.filterArtisans();
    }

    filterArtisans() {
        const specialty = document.getElementById('filter-specialty').value;
        const location  = document.getElementById('filter-location').value;
        const rate      = document.getElementById('filter-rate').value;

        let filtered = this.artisanDatabase.filter(a => {
            const matchSpec = specialty === 'all' || a.specialty === specialty;
            const matchLoc  = location === 'all' || a.location === location;
            let matchRate   = true;
            if (rate === 'low')  matchRate = a.rate < 20000;
            if (rate === 'mid')  matchRate = a.rate >= 20000 && a.rate <= 40000;
            if (rate === 'high') matchRate = a.rate > 40000;
            return matchSpec && matchLoc && matchRate;
        });

        const grid = document.getElementById('artisan-grid');
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <span>🔍</span>
                    <p>No artisans match your current filters. Try adjusting your search.</p>
                </div>`;
            return;
        }

        filtered.forEach(artisan => {
            const card = document.createElement('div');
            card.className = 'artisan-card';
            card.innerHTML = `
                <div class="artisan-card-header">
                    <div class="artisan-avatar">${artisan.avatar}</div>
                    <div class="artisan-meta">
                        <h4>${artisan.name}</h4>
                        <span>${artisan.type}</span>
                    </div>
                    <div class="verified-badge">✓ Verified</div>
                </div>
                <p style="font-size:0.83rem;color:var(--text-secondary);margin-bottom:16px;line-height:1.6;">${artisan.bio}</p>
                <div class="artisan-stats">
                    <div class="stat-pill">
                        <span class="stat-label">Daily Rate</span>
                        <span class="stat-value">₦${artisan.rate.toLocaleString()}</span>
                    </div>
                    <div class="stat-pill">
                        <span class="stat-label">Location</span>
                        <span class="stat-value">${artisan.city}</span>
                    </div>
                    <div class="stat-pill">
                        <span class="stat-label">Rating</span>
                        <span class="stat-value">⭐ ${artisan.rating}/5</span>
                    </div>
                    <div class="stat-pill">
                        <span class="stat-label">Jobs Done</span>
                        <span class="stat-value">${artisan.jobs}+</span>
                    </div>
                </div>
                <div class="artisan-tags">
                    ${artisan.tags.map(t => `<span class="artisan-tag">${t}</span>`).join('')}
                </div>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
                    <span style="width:8px;height:8px;border-radius:50%;background:${artisan.available ? 'var(--success)' : 'var(--text-muted)'};display:inline-block;box-shadow:${artisan.available ? '0 0 8px var(--accent)' : 'none'};"></span>
                    <span style="font-size:0.78rem;color:${artisan.available ? 'var(--success)' : 'var(--text-muted)'};">${artisan.available ? 'Available Now' : 'Currently Booked'}</span>
                </div>
                <button class="book-btn" onclick="App.openBookingDeck(${artisan.id})" ${!artisan.available ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
                    ${artisan.available ? '📋 Open Booking Deck' : 'Currently Unavailable'}
                </button>
            `;
            grid.appendChild(card);
        });
    }

    openBookingDeck(artisanId) {
        const artisan = this.artisanDatabase.find(a => a.id === artisanId);
        if (!artisan) return;

        // Pre-fill escrow form with this artisan's specialty
        const specialtyMap = {
            painter:   'painter',
            freight:   'freight',
            machinist: 'machinist'
        };
        const escSelect = document.getElementById('esc-specialty');
        if (escSelect && specialtyMap[artisan.specialty]) {
            escSelect.value = specialtyMap[artisan.specialty];
        }
        this.switchTab('escrow');
    }

    /* ── PROJECTS TAB ───────────────────────────────── */
    renderProjectsTab() {
        const content = document.getElementById('projects-content');
        const title   = document.getElementById('projects-title');
        const sub     = document.getElementById('projects-subtitle');

        if (this.currentRole === 'artisan') {
            title.textContent = 'My Active Bookings';
            sub.textContent   = 'Incoming project requests and your current engagements.';
        } else {
            title.textContent = 'Active Projects';
            sub.textContent   = 'Track your ongoing bookings and milestone escrow balances.';
        }

        if (this.activeProjects.length === 0) {
            content.innerHTML = `
                <div class="projects-empty">
                    <span>📁</span>
                    <h3>No active projects yet</h3>
                    <p>Generate a ledger in the Escrow tab and confirm a booking to see it here.</p>
                </div>`;
            return;
        }

        content.innerHTML = '';
        this.activeProjects.forEach((project, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-status-dot"></div>
                <div class="project-info">
                    <h4>${project.specialty}</h4>
                    <p>${project.days} day project • ${project.logistics > 0 ? 'With logistics' : 'No logistics'} ${project.haulage ? '• Bulk haulage included' : ''}</p>
                </div>
                <span class="project-days-badge">${project.days} days</span>
                <span class="project-total">₦${project.total.toLocaleString()}</span>
                <button onclick="App.removeProject(${idx})" style="background:rgba(224,48,64,0.1);border:1px solid rgba(224,48,64,0.3);border-radius:8px;padding:6px 10px;cursor:pointer;color:#e03040;font-size:0.8rem;transition:var(--transition);">Remove</button>
            `;
            content.appendChild(card);
        });

        // Artisan dashboard stats
        if (this.currentRole === 'artisan') {
            const totalEarnings = this.activeProjects.reduce((s, p) => s + p.total, 0);
            const statsDiv = document.createElement('div');
            statsDiv.className = 'artisan-dashboard-grid';
            statsDiv.style.marginTop = '28px';
            statsDiv.innerHTML = `
                <div class="dashboard-stat-card">
                    <span class="stat-num">${this.activeProjects.length}</span>
                    <span class="stat-desc">Active Bookings</span>
                </div>
                <div class="dashboard-stat-card">
                    <span class="stat-num">₦${totalEarnings.toLocaleString()}</span>
                    <span class="stat-desc">Total Escrow Value</span>
                </div>
                <div class="dashboard-stat-card">
                    <span class="stat-num">${this.activeProjects.reduce((s, p) => s + p.days, 0)}</span>
                    <span class="stat-desc">Total Project Days</span>
                </div>
            `;
            content.appendChild(statsDiv);
        }
    }

    removeProject(idx) {
        this.activeProjects.splice(idx, 1);
        this.renderProjectsTab();
    }

    /* ── ESCROW CALCULATOR ──────────────────────────── */
    bindHaulageToggle() {
        const toggle = document.getElementById('esc-haulage');
        if (toggle) {
            toggle.addEventListener('change', () => {
                const note = document.getElementById('haulage-note');
                if (toggle.checked) note.classList.remove('app-hidden');
                else note.classList.add('app-hidden');
            });
        }
    }

    generateLedger() {
        const specialtyKey = document.getElementById('esc-specialty').value;
        const daysInput    = parseInt(document.getElementById('esc-days').value);
        const logisticsVal = parseInt(document.getElementById('esc-logistics').value);
        const haulage      = document.getElementById('esc-haulage').checked;

        if (!daysInput || daysInput < 1) {
            alert('Please enter a valid number of project days.');
            return;
        }

        const spec        = this.specialtyRates[specialtyKey];
        const baseLabor   = spec.rate * daysInput;

        // 10% volume discount if project exceeds 10 days
        const hasDiscount  = daysInput > 10;
        const discountAmt  = hasDiscount ? Math.round(baseLabor * 0.10) : 0;
        const laborAfterDiscount = baseLabor - discountAmt;

        const haulageFee   = haulage ? 20000 : 0;
        const grandTotal   = laborAfterDiscount + logisticsVal + haulageFee;

        // Store for booking
        this.lastLedger = {
            specialty: spec.label,
            days: daysInput,
            rate: spec.rate,
            labor: laborAfterDiscount,
            logistics: logisticsVal,
            haulage: haulageFee,
            total: grandTotal,
            discount: discountAmt
        };

        // Render
        document.getElementById('out-specialty').textContent = spec.label;
        document.getElementById('out-rate').textContent      = `₦${spec.rate.toLocaleString()}/day`;
        document.getElementById('out-days').textContent      = `${daysInput} day${daysInput > 1 ? 's' : ''}`;
        document.getElementById('out-labor').textContent     = `₦${laborAfterDiscount.toLocaleString()}`;
        document.getElementById('out-logistics').textContent = `₦${logisticsVal.toLocaleString()}`;
        document.getElementById('out-haulage').textContent   = `₦${haulageFee.toLocaleString()}`;
        document.getElementById('out-total').textContent     = `₦${grandTotal.toLocaleString()}`;

        const discountRow = document.getElementById('discount-row');
        if (hasDiscount) {
            discountRow.style.display = 'flex';
            document.getElementById('out-discount').textContent = `-₦${discountAmt.toLocaleString()} saved`;
        } else {
            discountRow.style.display = 'none';
        }

        document.getElementById('escrow-empty').classList.add('app-hidden');
        document.getElementById('escrow-output').classList.remove('app-hidden');
    }

    confirmBooking() {
        if (!this.lastLedger) return;
        this.activeProjects.push(this.lastLedger);
        this.renderProjectsTab();

        const modal = document.getElementById('booking-modal');
        const msg   = document.getElementById('modal-message');
        msg.textContent = `${this.lastLedger.specialty} project for ${this.lastLedger.days} days secured in escrow. Total: ₦${this.lastLedger.total.toLocaleString()}.`;
        modal.classList.remove('app-hidden');
    }

    closeModal() {
        document.getElementById('booking-modal').classList.add('app-hidden');
        this.switchTab('projects');
    }
}

/* ── BOOT ───────────────────────────────────────────── */
const App = new ArtisanSyncEngine();
