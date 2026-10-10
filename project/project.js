

console.log("Football Hub JavaScript is running!");

const teams = [
    {
        name: "Manchester United",
        country: "England",
        league: "Premier League",
        image: "images/team1.jpg",
        description: "A historic English club with supporters around the world."
    },
    {
        name: "Arsenal",
        country: "England",
        league: "Premier League",
        image: "images/team2.jpg",
        description: "A London club known for its history and attacking football."
    },
    {
        name: "Real Madrid",
        country: "Spain",
        league: "La Liga",
        image: "images/team3.jpg",
        description: "A famous Spanish club known for its European success."
    },
    {
        name: "Barcelona",
        country: "Spain",
        league: "La Liga",
        image: "images/team4.jpg",
        description: "A Spanish club recognised for its footballing traditions."
    },
    {
        name: "Orlando Pirates",
        country: "South Africa",
        league: "South African Premiership",
        image: "images/team5.jpg",
        description: "A celebrated South African club with a passionate fan base."
    },
    {
        name: "Mamelodi Sundowns",
        country: "South Africa",
        league: "South African Premiership",
        image: "images/team6.jpg",
        description: "A South African club with a strong domestic record."
    }
];

const featuredContainer = document.querySelector("#featured-teams");
const allTeamsContainer = document.querySelector("#all-teams");
const leagueFilter = document.querySelector("#league-filter");
const teamCount = document.querySelector("#team-count");
const currentYear = document.querySelector("#current-year");
const savedTeamOutput = document.querySelector("#saved-team");

function createTeamCard(team) {
    return `
        <article class="team-card">
            <img src="${team.image}"
                 alt="${team.name}"
                 loading="lazy"
                 width="400"
                 height="250">
            <div class="team-card-content">
                <h3>${team.name}</h3>
                <p>${team.country} | ${team.league}</p>
                <p>${team.description}</p>
                <button class="button team-select"
                        type="button"
                        data-team="${team.name}">
                    Choose Team
                </button>
            </div>
        </article>
    `;
}

function displayFeaturedTeams() {
    if (!featuredContainer) {
        return;
    }

    featuredContainer.innerHTML = teams
        .slice(0, 3)
        .map((team) => createTeamCard(team))
        .join("");
}

function displayAllTeams(selectedLeague = "all") {
    if (!allTeamsContainer) {
        return;
    }

    const filteredTeams = selectedLeague === "all"
        ? teams
        : teams.filter((team) => team.league === selectedLeague);

    if (filteredTeams.length === 0) {
        allTeamsContainer.innerHTML =
            `<p>No teams were found in this league.</p>`;
    } else {
        allTeamsContainer.innerHTML = filteredTeams
            .map((team) => createTeamCard(team))
            .join("");
    }

    if (teamCount) {
        if (selectedLeague === "all") {
            teamCount.textContent = `Showing all ${teams.length} teams.`;
        } else {
            const label = filteredTeams.length === 1 ? "team" : "teams";
            teamCount.textContent =
                `Showing ${filteredTeams.length} ${label} in ${selectedLeague}.`;
        }
    }
}

function saveSelectedTeam(teamName) {
    const selectedTeam = teams.find((team) => team.name === teamName);

    if (!selectedTeam) {
        return;
    }

    localStorage.setItem("footballHubTeam", selectedTeam.name);
    displaySavedTeam();
}

function setupTeamSelection() {
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".team-select");

        if (button) {
            saveSelectedTeam(button.dataset.team);
        }
    });
}

function setupLeagueFilter() {
    if (!leagueFilter) {
        return;
    }

    const savedLeague = localStorage.getItem("footballHubLeague");

    if (savedLeague && [...leagueFilter.options].some(
        (option) => option.value === savedLeague
    )) {
        leagueFilter.value = savedLeague;
    }

    displayAllTeams(leagueFilter.value);

    leagueFilter.addEventListener("change", () => {
        localStorage.setItem("footballHubLeague", leagueFilter.value);
        displayAllTeams(leagueFilter.value);
    });
}

function displaySavedTeam() {
    if (!savedTeamOutput) {
        return;
    }

    const savedTeam = localStorage.getItem("footballHubTeam");

    savedTeamOutput.textContent = savedTeam
        ? `Your favourite team: ${savedTeam}`
        : `No favourite team selected yet.`;
}

function displayCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

displayFeaturedTeams();
setupLeagueFilter();
setupTeamSelection();
displaySavedTeam();
displayCurrentYear();