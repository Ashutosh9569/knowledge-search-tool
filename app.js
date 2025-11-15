// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOCK DATABASE ---
    // This is our indexed set of internal documents.
    const DB = [
        {
            id: 1,
            title: "Q4 Marketing Strategy",
            link: "#",
            category: "presentation",
            team: "marketing",
            snippet: "The complete slide deck for the Q4 marketing plan, focusing on new product launches and social media campaigns.",
            updated: "2025-11-10",
            owner: "Jane Doe"
        },
        {
            id: 2,
            title: "West Coast Sales Report - Oct",
            link: "#",
            category: "report",
            team: "sales",
            snippet: "Analysis of sales figures from the West Coast region for October. Includes key metrics and growth opportunities.",
            updated: "2025-11-05",
            owner: "John Smith"
        },
        {
            id: 3,
            title: "New Logo & Brand Guidelines",
            link: "#",
            category: "asset",
            team: "marketing",
            snippet: "Official brand assets, including new logos (SVG, PNG) and the complete PDF brand style guide.",
            updated: "2025-11-01",
            owner: "Jane Doe"
        },
        {
            id: 4,
            title: "Project Phoenix - Sprint 3 Planning",
            link: "#",
            category: "report",
            team: "product",
            snippet: "Documentation for the third sprint of Project Phoenix, outlining user stories, tasks, and deadlines.",
            updated: "2025-11-12",
            owner: "Alex Johnson"
        },
        {
            id: 5,
            title: "Cloud Infrastructure Onboarding",
            link: "#",
            category: "guide",
            team: "devops",
            snippet: "A complete guide for new engineers on accessing and using the company's cloud infrastructure (OCI/AWS).",
            updated: "2025-10-28",
            owner: "Sam Lee"
        },
        {
            id: 6,
            title: "Competitor Analysis - Q3",
            link: "#",
            category: "report",
            team: "marketing",
            snippet: "In-depth analysis of key competitors' activities, marketing campaigns, and product launches in Q3.",
            updated: "2025-10-15",
            owner: "Jane Doe"
        },
        {
            id: 7,
            title: "Sales Pitch Deck - Enterprise",
            link: "#",
            category: "presentation",
            team: "sales",
            snippet: "The standard slide deck for pitching to enterprise-level clients. Updated with new case studies.",
            updated: "2025-11-08",
            owner: "John Smith"
        }
    ];

    // --- 2. GET DOM ELEMENTS ---
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const teamFilter = document.getElementById('team-filter');
    const resultsContainer = document.getElementById('results-container');

    // --- 3. RENDER FUNCTION ---
    // This function takes an array of results and builds the HTML
    function renderResults(results) {
        // Clear any previous results or placeholders
        resultsContainer.innerHTML = '';

        // Check if there are no results
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="placeholder-text">No documents found matching your criteria.</p>';
            return;
        }

        // Loop through each result and create a result card
        results.forEach(item => {
            const resultElement = document.createElement('article');
            resultElement.className = 'result-item';

           resultElement.innerHTML = `
                <div class="result-header">
                    <a href="${item.link}" class="result-title">${item.title}</a>
                    <span class="result-category">${item.category}</span>
                </div>
                <p class="result-snippet">${item.snippet}</p>
                <div class="result-meta">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Team: <strong>${item.team}</strong>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Owner: <strong>${item.owner}</strong>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Updated: <strong>${item.updated}</strong>
                    </span>
                </div>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }

    // --- 4. SEARCH & FILTER FUNCTION ---
    function performSearch() {
        // Get current values from all inputs
        const searchTerm = searchBar.value.toLowerCase();
        const category = categoryFilter.value;
        const team = teamFilter.value;

        // Handle the initial empty state
        if (!searchTerm && category === 'all' && team === 'all') {
            resultsContainer.innerHTML = '<p class="placeholder-text">Enter a search term to find your files.</p>';
            return;
        }

        // Filter the database
        const filteredResults = DB.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                                  item.snippet.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === 'all' || item.category === category;
            
            const matchesTeam = team === 'all' || item.team === team;

            return matchesSearch && matchesCategory && matchesTeam;
        });

        // Render the filtered results
        renderResults(filteredResults);
    }

    // --- 5. EVENT LISTENERS ---
    // Run the search function whenever any input changes
    searchBar.addEventListener('input', performSearch);
    categoryFilter.addEventListener('change', performSearch);
    teamFilter.addEventListener('change', performSearch);
});