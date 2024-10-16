document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplay = document.getElementById('resumeDisplay') as HTMLElement;
    const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;
    const shareButton = document.getElementById('share-link') as HTMLButtonElement;
    const downloadButton = document.getElementById('download-pdf') as HTMLButtonElement;

    // Function to generate the resume content
    function generateResume() {
        const name = document.getElementById('name') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const phone = document.getElementById('phone') as HTMLInputElement;
        const education = document.getElementById('education-input') as HTMLTextAreaElement;
        const skillsList = document.getElementById('skills-list') as HTMLElement;
        const experience = document.getElementById('experience') as HTMLInputElement;

        resumeDisplay.innerHTML = `
            <h2>${name.value}</h2>
            <p>Email: ${email.value}</p>
            <p>Phone: ${phone.value}</p>
            <h3>Education</h3>
            <p>${education.value}</p>
            <h3>Skills</h3>
            <p>${skillsList.innerHTML}</p>
            <h3>Experience</h3>
            <p>${experience.value}</p>
        `;
    }

    // Function to generate a shareable link
    function generateShareableLink() {
        const resumeData = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            phone: (document.getElementById('phone') as HTMLInputElement).value,
            education: (document.getElementById('education-input') as HTMLTextAreaElement).value,
            skills: (document.getElementById('skills-list') as HTMLElement).innerHTML,
            experience: (document.getElementById('experience') as HTMLInputElement).value
        };
        const queryString = new URLSearchParams(resumeData).toString();
        const shareableLink = `${window.location.origin}?${queryString}`;
        alert(`Shareable Link: ${shareableLink}`);
    }

    
    
    // Function to download resume as PDF without external library
    function downloadResumePDF() {
        const resumeContent = resumeDisplay.innerHTML;
        const element = document.createElement('a');
        const file = new Blob([resumeContent], { type: 'application/pdf' });

        element.href = URL.createObjectURL(file);
        element.download = 'resume.pdf';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }


    

    // Event listeners for buttons
    generateButton.addEventListener('click', (e) => {
        e.preventDefault();
        generateResume();
    });

    shareButton.addEventListener('click', (e) => {
        e.preventDefault();
        generateShareableLink();
    });

    downloadButton.addEventListener('click', (e) => {
        e.preventDefault();
        downloadResumePDF();
    });

    // Toggle Education Section
    const toggleEducationButton = document.getElementById('toggle-education-form') as HTMLButtonElement;
    toggleEducationButton.addEventListener('click', () => {
        const educationSection = document.getElementById('education-section') as HTMLElement;
        if (educationSection.style.display === 'none' || educationSection.style.display === '') {
            educationSection.style.display = 'block';
        } else {
            educationSection.style.display = 'none';
        }
    });

    // Toggle Skills Section
    const toggleSkillsButton = document.getElementById('toggle-skills-form') as HTMLButtonElement;
    toggleSkillsButton.addEventListener('click', () => {
        const skillsSection = document.getElementById('skills-section') as HTMLElement;
        if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
            skillsSection.style.display = 'block';
        } else {
            skillsSection.style.display = 'none';
        }
    });

    // Add Skills
    const addSkillsButton = document.getElementById('add-skills') as HTMLButtonElement;
    const skillsInput = document.getElementById('skills-input') as HTMLInputElement;
    const skillsList = document.getElementById('skills-list') as HTMLElement;

    addSkillsButton.addEventListener('click', () => {
        if (skillsInput.value.trim() !== '') {
            const skillItem = document.createElement('p');
            skillItem.textContent = skillsInput.value;
            skillsList.appendChild(skillItem);
            skillsInput.value = ''; // Clear input field after adding
        }
    });

    // Edit Skills (You can expand this functionality)
    const editSkillsButton = document.getElementById('edit-skills') as HTMLButtonElement;
    editSkillsButton.addEventListener('click', () => {
        const skillsItems = skillsList.querySelectorAll('p');
        if (skillsItems.length > 0) {
            skillsInput.value = skillsItems[skillsItems.length - 1].textContent || '';
            skillsItems[skillsItems.length - 1].remove(); // Remove last skill for editing
        }
    });

    // Populate fields from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('name') && urlParams.has('email')) {
        (document.getElementById('name') as HTMLInputElement).value = urlParams.get('name') || '';
        (document.getElementById('email') as HTMLInputElement).value = urlParams.get('email') || '';
        (document.getElementById('phone') as HTMLInputElement).value = urlParams.get('phone') || '';
        (document.getElementById('education-input') as HTMLTextAreaElement).value = urlParams.get('education') || '';
        skillsList.innerHTML = urlParams.get('skills') || '';
        (document.getElementById('experience') as HTMLInputElement).value = urlParams.get('experience') || '';
        generateResume(); // Automatically generate resume based on URL params
    }
});
