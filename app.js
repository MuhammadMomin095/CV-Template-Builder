document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeDisplay = document.getElementById('resumeDisplay');
    var generateButton = document.getElementById('generate-resume');
    var shareButton = document.getElementById('share-link');
    var downloadButton = document.getElementById('download-pdf');
    // Function to generate the resume content
    function generateResume() {
        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var phone = document.getElementById('phone');
        var education = document.getElementById('education-input');
        var skillsList = document.getElementById('skills-list');
        var experience = document.getElementById('experience');
        resumeDisplay.innerHTML = "\n            <h2>".concat(name.value, "</h2>\n            <p>Email: ").concat(email.value, "</p>\n            <p>Phone: ").concat(phone.value, "</p>\n            <h3>Education</h3>\n            <p>").concat(education.value, "</p>\n            <h3>Skills</h3>\n            <p>").concat(skillsList.innerHTML, "</p>\n            <h3>Experience</h3>\n            <p>").concat(experience.value, "</p>\n        ");
    }
    // Function to generate a shareable link
    function generateShareableLink() {
        var resumeData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            education: document.getElementById('education-input').value,
            skills: document.getElementById('skills-list').innerHTML,
            experience: document.getElementById('experience').value
        };
        var queryString = new URLSearchParams(resumeData).toString();
        var shareableLink = "".concat(window.location.origin, "?").concat(queryString);
        alert("Shareable Link: ".concat(shareableLink));
    }
    // Function to download resume as PDF without external library
    function downloadResumePDF() {
        var resumeContent = resumeDisplay.innerHTML;
        var element = document.createElement('a');
        var file = new Blob([resumeContent], { type: 'application/pdf' });
        element.href = URL.createObjectURL(file);
        element.download = 'resume.pdf';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    // Event listeners for buttons
    generateButton.addEventListener('click', function (e) {
        e.preventDefault();
        generateResume();
    });
    shareButton.addEventListener('click', function (e) {
        e.preventDefault();
        generateShareableLink();
    });
    downloadButton.addEventListener('click', function (e) {
        e.preventDefault();
        downloadResumePDF();
    });
    // Toggle Education Section
    var toggleEducationButton = document.getElementById('toggle-education-form');
    toggleEducationButton.addEventListener('click', function () {
        var educationSection = document.getElementById('education-section');
        if (educationSection.style.display === 'none' || educationSection.style.display === '') {
            educationSection.style.display = 'block';
        }
        else {
            educationSection.style.display = 'none';
        }
    });
    // Toggle Skills Section
    var toggleSkillsButton = document.getElementById('toggle-skills-form');
    toggleSkillsButton.addEventListener('click', function () {
        var skillsSection = document.getElementById('skills-section');
        if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
            skillsSection.style.display = 'block';
        }
        else {
            skillsSection.style.display = 'none';
        }
    });
    // Add Skills
    var addSkillsButton = document.getElementById('add-skills');
    var skillsInput = document.getElementById('skills-input');
    var skillsList = document.getElementById('skills-list');
    addSkillsButton.addEventListener('click', function () {
        if (skillsInput.value.trim() !== '') {
            var skillItem = document.createElement('p');
            skillItem.textContent = skillsInput.value;
            skillsList.appendChild(skillItem);
            skillsInput.value = ''; // Clear input field after adding
        }
    });
    // Edit Skills (You can expand this functionality)
    var editSkillsButton = document.getElementById('edit-skills');
    editSkillsButton.addEventListener('click', function () {
        var skillsItems = skillsList.querySelectorAll('p');
        if (skillsItems.length > 0) {
            skillsInput.value = skillsItems[skillsItems.length - 1].textContent || '';
            skillsItems[skillsItems.length - 1].remove(); // Remove last skill for editing
        }
    });
    // Populate fields from URL if available
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('name') && urlParams.has('email')) {
        document.getElementById('name').value = urlParams.get('name') || '';
        document.getElementById('email').value = urlParams.get('email') || '';
        document.getElementById('phone').value = urlParams.get('phone') || '';
        document.getElementById('education-input').value = urlParams.get('education') || '';
        skillsList.innerHTML = urlParams.get('skills') || '';
        document.getElementById('experience').value = urlParams.get('experience') || '';
        generateResume(); // Automatically generate resume based on URL params
    }
});
