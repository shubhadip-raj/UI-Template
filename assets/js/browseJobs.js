//  document.addEventListener("DOMContentLoaded", function () {
//       const browseJobsLink = document.getElementById("browseJobsLink");
//       const baseUrl = window.location.hostname === "localhost"
//         ? "http://localhost:3000/browse-jobs"
//         : "https://app.jobbox.one/browse-jobs";

//       browseJobsLink.href = baseUrl;
//       browseJobsLink.setAttribute("target","_black")
//     });

const baseUrl = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://app.jobbox.one";
let jobs = [];
let companyLogos = {};
let search = '';
let searchPage = 0;
let searchPageSize = 20;
let totalPages = 0;

document.getElementById('searchButton').addEventListener('click', () => {
  const inputEl = document.getElementById('searchInput');
  search = inputEl.value.trim();
  searchPage = 0;
  fetchJobs();
});


// // ✅ Ensure jobs load after DOM is ready
// document.addEventListener('DOMContentLoaded', () => {
//   fetchJobs();
// });

async function fetchJobs() {
  const endpoint = search
    ? `${CONFIG.API_URL}/searchBrowseJobs?search=${search}&page=${searchPage}&size=${searchPageSize}`
    : `${CONFIG.API_URL}/paginationJobs?page=${searchPage}&size=${searchPageSize}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    jobs = data.content || [];
    totalPages = data.totalPages || 1;
    await fetchImages(jobs);
    renderJobs();
    renderPagination();
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

async function fetchImages(jobs) {
  try {
    const logoPromises = jobs.map(job => fetchCompanyLogo(job.companyName));
    const logos = await Promise.all(logoPromises);
    companyLogos = {};
    jobs.forEach((job, index) => {
      companyLogos[job.companyName] = logos[index];
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function fetchCompanyLogo(companyName) {
  try {
    const encodedCompanyName = encodeURIComponent(companyName);
    const response = await fetch(`${CONFIG.API_URL}/logo?companyName=${encodedCompanyName}`);
    const buffer = await response.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode(...new Uint8Array(buffer))
    );
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Error fetching company logo for:', companyName);
    //return "https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg";
  }
}
function renderJobs() {
  const container = document.getElementById('jobResults');
  container.innerHTML = '';

  if (jobs.length === 0) {
    container.innerHTML = '<h2 style="color: red; text-align: center;">No jobs found</h2>';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'job-grid';

  jobs.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <div class="job-header">
        <img class="company-logo" src="${companyLogos[job.companyName] || defaultLogoUrl}" alt="${job.companyName} Logo" />
        <span class="company-name">${job.companyName}</span>
      </div>
      <h3 class="job-title">${job.jobTitle}</h3>
      <small class="posting-date">${calculateDaysAgo(job.postingDate)}</small>
    `;
    div.querySelector('.company-logo').onclick = () => {
      const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
      window.location.href = companyUrl;
    };
    div.querySelector('.company-name').onclick = () => {
      const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
      window.location.href = companyUrl;
    };
    div.querySelector('.job-title').onclick = () => {
      const jobUrl = `${baseUrl}/browse-jobs/job-details?` + new URLSearchParams({
        companyName: job.companyName,
        jobId: job.jobId
      }).toString();
      window.location.href = jobUrl;
    };

    grid.appendChild(div);
  });

  container.appendChild(grid);
}

function createJobCard(job, companyLogos) {
  const card = document.createElement('div');
  card.className = 'job-card';
  card.style.cssText = `
    width: 100%;
    max-width: 250px;
    margin: 10px;
    padding-top: 0px;
    box-sizing: border-box;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    background: #fff;
  `;

  const logoImg = document.createElement('img');
  logoImg.src = companyLogos[job.companyName] || "https://via.placeholder.com/100x100?text=Logo";
  logoImg.alt = `${job.companyName} logo`;
  logoImg.style.cssText = `
    width: 30%;
    height: 30%;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  `;
  logoImg.onclick = () => { 
    const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
    window.location.href = companyUrl;
  };

  const subtitle = document.createElement('div');
  subtitle.textContent = job.companyName;
  subtitle.className = 'mb-2 text-muted';
  subtitle.style.cssText = `
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  `;
  subtitle.onclick = () => {
    const companyUrl = `${baseUrl}/companyPage/companyName/${encodeURIComponent(job.companyName)}`;
    window.location.href = companyUrl;
  };

  const title = document.createElement('div');
  title.textContent = job.jobTitle;
  title.style.cssText = `
    margin-top: 40px;
    font-size: 12px;
    cursor: pointer;
  `;
  title.onclick = () => {
    const baseJobUrl = `${baseUrl}/browse-jobs/job-details`;
    const params = new URLSearchParams({
      companyName: encodeURIComponent(job.companyName || ''),
      jobId: encodeURIComponent(job.jobId || ''),
    }).toString();
    const fullUrl = `${baseJobUrl}?${params}`;
    window.location.href = fullUrl;
  };

  const daysAgoText = calculateDaysAgo(job.postingDate);
  const text = document.createElement('div');
  text.textContent = daysAgoText;
  text.style.cssText = `
    font-size: ${daysAgoText === '> 7 days ago' ? '10px' : '14px'};
    color: #666;
  `;

  card.appendChild(logoImg);
  card.appendChild(subtitle);
  card.appendChild(title);
  card.appendChild(text);

  return card;
}


function renderPagination() {
  const container = document.getElementById('paginationControls');
  container.innerHTML = '';

  // Always render page size dropdown
  const pageSizeWrapper = document.createElement('div');
  pageSizeWrapper.className = 'page-size-select';
  pageSizeWrapper.innerHTML = `
    <label for="pageSizeSelect">Show Entries:</label>
    <select id="pageSizeSelect">
      <option value="20" ${searchPageSize === 20 ? 'selected' : ''}>20</option>
      <option value="40" ${searchPageSize === 40 ? 'selected' : ''}>40</option>
      <option value="60" ${searchPageSize === 60 ? 'selected' : ''}>60</option>
    </select>
  `;
  container.appendChild(pageSizeWrapper);

  document.getElementById('pageSizeSelect').addEventListener('change', (event) => {
    searchPageSize = parseInt(event.target.value);
    searchPage = 0;
    fetchJobs();
  });

  // Only show pagination controls if more than 1 page
  if (totalPages <= 1) return;

  const paginationWrapper = document.createElement('div');
  paginationWrapper.className = 'pagination';

  // Previous Button
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';
  prevBtn.disabled = searchPage === 0;
  prevBtn.onclick = () => {
    if (searchPage > 0) {
      searchPage--;
      fetchJobs();
    }
  };
  paginationWrapper.appendChild(prevBtn);

  const createPageButton = (pageNum) => {
    const span = document.createElement('span');
    span.textContent = pageNum + 1;
    span.className = 'page-number' + (searchPage === pageNum ? ' active' : '');
    span.onclick = () => {
      searchPage = pageNum;
      fetchJobs();
    };
    return span;
  };

  const addEllipsis = () => {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.className = 'ellipsis';
    paginationWrapper.appendChild(ellipsis);
  };

  const maxDisplay = 5;
  const start = Math.max(0, searchPage - 1);
  const end = Math.min(totalPages, start + maxDisplay);

  if (start > 0) {
    paginationWrapper.appendChild(createPageButton(0));
    if (start > 1) addEllipsis();
  }

  for (let i = start; i < end; i++) {
    paginationWrapper.appendChild(createPageButton(i));
  }

  if (end < totalPages) {
    if (end < totalPages - 1) addEllipsis();
    paginationWrapper.appendChild(createPageButton(totalPages - 1));
  }

  // Next Button
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.disabled = searchPage >= totalPages - 1;
  nextBtn.onclick = () => {
    if (searchPage < totalPages - 1) {
      searchPage++;
      fetchJobs();
    }
  };
  paginationWrapper.appendChild(nextBtn);

  container.appendChild(paginationWrapper);
}



function calculateDaysAgo(postingDate) {
  const today = new Date();
  const postDate = new Date(postingDate);
  const diff = today - postDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days <= 7 ? `${days} days ago` : '> 7 days ago';
}

fetchJobs(); // Initial load

