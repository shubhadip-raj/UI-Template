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

// Add input event listener to handle clearing the search
document.getElementById('searchInput').addEventListener('input', (event) => {
  if (event.target.value.trim() === '') {
    search = '';
    searchPage = 0;
    fetchJobs();
  }
});

// Add keypress event listener for Enter key
document.getElementById('searchInput').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const inputEl = document.getElementById('searchInput');
    search = inputEl.value.trim();
    searchPage = 0;
    fetchJobs();
  }
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
    return "https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg";
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
    const logoUrl = companyLogos[job.companyName] || 'https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg';
    console.log('Company:', job.companyName, 'Logo URL:', logoUrl);

    div.innerHTML = `
      <div class="job-header">
        <img class="company-logo" src="${logoUrl}" alt="${job.companyName} Logo" onerror="this.onerror=null; this.src='https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg';" />
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
  logoImg.src = companyLogos[job.companyName] || "https://static.vecteezy.com/system/resources/previews/013/899/376/original/cityscape-design-corporation-of-buildings-logo-for-real-estate-business-company-vector.jpg";
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

  card.appendChild(subtitle);
  card.appendChild(logoImg);
  card.appendChild(title);
  card.appendChild(text);

  return card;
}


function renderPagination() {
  const container = document.getElementById('paginationControls');
  container.innerHTML = '';
  container.className = 'pagination-container d-flex justify-content-end align-items-center';
  container.style.cssText = 'display: flex; justify-content: flex-end; align-items: flex-end;';

  // Always render page size dropdown
  const pageSizeWrapper = document.createElement('div');
  pageSizeWrapper.className = 'page-size-select me-3';
  pageSizeWrapper.style.cssText = 'margin-right: 1rem; margin-bottom: 4px;';
  pageSizeWrapper.innerHTML = `
    <label for="pageSizeSelect" style="color: black; font-size: 14px;">Show Entries:</label>
    <select id="pageSizeSelect" style="color: black; font-size: 14px; padding: 4px; border: 1px solid #ccc; border-radius: 4px; margin-left: 8px;">
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

  // Always show pagination controls
  const paginationWrapper = document.createElement('ul');
  paginationWrapper.className = 'pagination';
  paginationWrapper.setAttribute('role', 'navigation');
  paginationWrapper.setAttribute('aria-label', 'Pagination');
  paginationWrapper.style.cssText = 'display: flex; list-style: none; padding: 0; margin: 0; gap: 4px;';

  // Previous Button
  const prevLi = document.createElement('li');
  prevLi.className = 'previous' + (searchPage === 0 ? ' disabled' : '');
  const prevBtn = document.createElement('a');
  prevBtn.textContent = 'Previous';
  prevBtn.style.cssText = 'padding: 6px 12px; background: white; color:#663399; border-radius: 4px; cursor: pointer; font-size: 12px; text-decoration: none; display: block;';
  prevBtn.setAttribute('role', 'button');
  prevBtn.setAttribute('aria-label', 'Previous page');
  prevBtn.setAttribute('rel', 'prev');
  if (searchPage === 0) {
    prevBtn.setAttribute('aria-disabled', 'true');
    prevBtn.setAttribute('tabindex', '-1');
  }
  prevBtn.onclick = () => {
    if (searchPage > 0) {
      searchPage--;
      fetchJobs();
    }
  };
  prevLi.appendChild(prevBtn);
  paginationWrapper.appendChild(prevLi);

  const createPageButton = (pageNum) => {
    const li = document.createElement('li');
    li.className = searchPage === pageNum ? 'active' : '';
    const a = document.createElement('a');
    a.textContent = pageNum + 1;
    a.style.cssText = `
      padding: 6px 12px;
      cursor: pointer;
      color:#663399;
      border: 1px solid #663399;
      border-radius: 4px;
      text-decoration: none;
      display: block;
      font-size:10px;
      ${searchPage === pageNum ? 'background:#663399; color: white;' : ''}
    `;
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', `Page ${pageNum + 1}`);
    if (searchPage === pageNum) {
      a.setAttribute('aria-current', 'page');
    }
    a.onclick = () => {
      searchPage = pageNum;
      fetchJobs();
    };
    li.appendChild(a);
    return li;
  };

  const addEllipsis = () => {
    const li = document.createElement('li');
    li.className = 'break-me';
    const a = document.createElement('a');
    a.textContent = '...';
    a.style.cssText = 'padding: 6px 12px; color: #663399; text-decoration: none; display: block;';
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', 'Jump forward');
    li.appendChild(a);
    paginationWrapper.appendChild(li);
  };

  // Always show at least first two pages
  paginationWrapper.appendChild(createPageButton(0));
  if (totalPages > 1) {
    paginationWrapper.appendChild(createPageButton(1));
  }

  // Show ellipsis if there are more pages
  if (totalPages > 2) {
    addEllipsis();
    paginationWrapper.appendChild(createPageButton(totalPages - 1));
  }

  // Next Button
  const nextLi = document.createElement('li');
  nextLi.className = 'next' + (searchPage >= totalPages - 1 ? ' disabled' : '');
  const nextBtn = document.createElement('a');
  nextBtn.textContent = 'Next';
  nextBtn.style.cssText = 'padding: 6px 12px; background: white; color:#663399; border-radius: 4px; cursor: pointer; font-size: 12px; text-decoration: none; display: block;';
  nextBtn.setAttribute('role', 'button');
  nextBtn.setAttribute('aria-label', 'Next page');
  nextBtn.setAttribute('rel', 'next');
  if (searchPage >= totalPages - 1) {
    nextBtn.setAttribute('aria-disabled', 'true');
    nextBtn.setAttribute('tabindex', '-1');
  }
  nextBtn.onclick = () => {
    if (searchPage < totalPages - 1) {
      searchPage++;
      fetchJobs();
    }
  };
  nextLi.appendChild(nextBtn);
  paginationWrapper.appendChild(nextLi);

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

