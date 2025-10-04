// Global app state and utilities for Viggest AI Builder

const App = (() => {
	const initialState = {
		auth: { email: "", plan: "Free" },
		step: 1,
		loading: false,
		form: {
			level: "Beginner",
			skills: "SMMA, cold outreach",
			goal: "First $100",
			language: "EN",
			hasIdea: false,
			ideaText: ""
		},
		blueprint: null
	};

	let state = loadState();

	function loadState() {
		try {
			const raw = localStorage.getItem("viggest_state");
			if (raw) return JSON.parse(raw);
		} catch(_) {}
		return { ...initialState };
	}

	function saveState() {
		try { localStorage.setItem("viggest_state", JSON.stringify(state)); } catch(_){ }
	}

	function setState(partial) {
		state = { ...state, ...partial };
		saveState();
		return state;
	}

	function reset() { state = { ...initialState }; saveState(); }

	function toast(msg) {
		const el = document.getElementById("toast");
		if (!el) return;
		el.textContent = msg;
		el.classList.add("show");
		clearTimeout(el.__t);
		el.__t = setTimeout(()=> el.classList.remove("show"), 2200);
	}

	function copy(text) {
		navigator.clipboard.writeText(text || "").then(()=> toast("Copied"));
	}

	function download(filename, content, mime="application/octet-stream") {
		const blob = new Blob([content], { type: mime });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url; a.download = filename; a.click();
		URL.revokeObjectURL(url);
	}

	function header(activePath) {
		const email = state.auth.email || "Guest";
		return `
		<div class="max-w-6xl mx-auto flex items-center justify-between py-5 px-4">
			<a href="/wizard.html" class="text-white text-lg font-semibold hover:opacity-90">Viggest AI Builder</a>
			<div class="flex items-center gap-4 text-sm">
				<a class="hover:underline ${activePath==='history'?'text-white':'text-white/80'}" href="/history.html">History</a>
				<a class="hover:underline ${activePath==='settings'?'text-white':'text-white/80'}" href="/settings.html">Settings</a>
				<span class="hidden sm:inline text-white/60">${email}</span>
			</div>
		</div>`;
	}

	// Mock /api/generate by intercepting fetch
	const SAMPLE_BLUEPRINT = {
		"idea": { "name":"Cold DM Script AI", "one_liner":"Done-for-you, high-reply DM scripts", "audience":"SMMA beginners" },
		"offer": {
			"deliverables": ["3 scripts","1 bonus SOP"],
			"bonuses": ["Objection-handling cheatsheet"],
			"pricing": { "tiers": [{ "name": "Starter", "price": "$19" }] },
			"fulfillment_plan": {
				"day1": "Collect inputs",
				"day2": "Draft v1",
				"day3": "Review",
				"day4": "Finalize",
				"day5": "Package",
				"day6": "List on Whop",
				"day7": "Announce"
			}
		},
		"validation": {
			"scores": { "audience": 8, "pain": 7, "delivery": 9, "proof": 7, "risk": 3 },
			"green_flags": ["Clear audience","Fast delivery","Low risk"],
			"red_flags": ["Needs social proof","Niche saturation","Pricing sensitivity"],
			"decision": "PASS"
		},
		"whop": {
			"title": "High-Reply DM Scripts (AI)",
			"subtitle": "Launch your service in days",
			"description": "Concise benefit-driven description here…",
			"bullets": ["Plug-and-play scripts","Higher reply rates","Fast fulfillment","Easy to customize","Beginner-friendly"],
			"faqs": ["How long does it take?","What if I’m new?","Refunds?","Support?"]
		},
		"launch": {
			"twitter": { "main": "Main tweet…", "replies": ["Reply 1","Reply 2","Reply 3"] },
			"reddit": { "post": "Angle…", "comment": "Non-salesy comment…" },
			"discord": { "announcement": "Launch message…" },
			"email": { "body": "Waitlist email…" }
		}
	};

	const nativeFetch = window.fetch.bind(window);
	window.fetch = async function(url, options={}) {
		if (typeof url === 'string' && url.replace(location.origin,'').startsWith('/api/generate')) {
			await new Promise(r=> setTimeout(r, 700));
			return new Response(JSON.stringify(SAMPLE_BLUEPRINT), { status: 200, headers: { 'Content-Type': 'application/json' } });
		}
		return nativeFetch(url, options);
	}

	function renderHeader(active) {
		const slot = document.getElementById('app-header');
		if (slot) slot.innerHTML = header(active);
	}

	function setPlan(plan) {
		state.auth.plan = plan; saveState();
		toast(plan === 'Pro' ? 'Simulated upgrade (MVP)' : 'Plan set to Free');
	}

	function mdFromBlueprint(bp) {
		if (!bp) return "# Blueprint\nNo data yet.";
		return [
			`# Idea`,
			'```json', JSON.stringify(bp.idea, null, 2), '```',
			`\n# Offer`,
			'```json', JSON.stringify(bp.offer, null, 2), '```',
			`\n# Validation`,
			'```json', JSON.stringify(bp.validation, null, 2), '```',
			`\n# Whop Copy`,
			bp.whop ? `Title: ${bp.whop.title}\n\nSubtitle: ${bp.whop.subtitle}\n\nDescription:\n${bp.whop.description}\n\nBullets:\n- ${(bp.whop.bullets||[]).join("\n- ")}\n\nFAQs:\n- ${(bp.whop.faqs||[]).join("\n- ")}` : 'N/A',
			`\n# Launch 48h`,
			bp.launch ? `Twitter Main: ${bp.launch.twitter?.main||''}\nReplies: ${(bp.launch.twitter?.replies||[]).join(', ')}\n\nReddit Post: ${bp.launch.reddit?.post||''}\nComment: ${bp.launch.reddit?.comment||''}\n\nDiscord: ${bp.launch.discord?.announcement||''}\n\nEmail: ${bp.launch.email?.body||''}` : 'N/A'
		].join('\n');
	}

	return {
		get state(){ return state; },
		setState, saveState, reset, toast, copy, download, renderHeader, setPlan, mdFromBlueprint
	};
})();

// Small helpers usable by pages
function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }


