
// ================= SECTION NAVIGATION =================

function showSection(sectionId, clickedItem) {

    // Hide all sections
    let sections = document.querySelectorAll(".content-section");

    sections.forEach(function(section) {
        section.classList.remove("active-section");
    });


    // Show selected section
    let selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }


    // Remove active class from all menu items
    let menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function(item) {
        item.classList.remove("active");
    });


    // Add active class to selected menu
    if (clickedItem) {
        clickedItem.classList.add("active");
    }


    // Change page title
    let pageTitle = document.getElementById("pageTitle");
    let pageSubtitle = document.getElementById("pageSubtitle");


    if (sectionId === "dashboard") {

        pageTitle.innerText = "Admin Dashboard";
        pageSubtitle.innerText = "Welcome back, Admin!";

    }
    else if (sectionId === "doctors") {

        pageTitle.innerText = "Manage Doctors";
        pageSubtitle.innerText = "View and manage registered doctors.";

    }
    else if (sectionId === "patients") {

        pageTitle.innerText = "Manage Patients";
        pageSubtitle.innerText = "View registered patient information.";

    }
    else if (sectionId === "appointments") {

        pageTitle.innerText = "Appointments";
        pageSubtitle.innerText = "Monitor all doctor appointments.";

    }
    else if (sectionId === "payments") {

        pageTitle.innerText = "Payments";
        pageSubtitle.innerText = "View consultation fees and payment records.";

    }
    else if (sectionId === "history") {

        pageTitle.innerText = "Consultation History";
        pageSubtitle.innerText = "View completed consultation records.";

    }

}


// ================= DELETE RECORD =================

function deleteRecord(button) {

    let confirmation = confirm(
        "Are you sure you want to delete this record?"
    );

    if (confirmation) {

        let row = button.closest("tr");

        row.remove();

        alert("Record deleted successfully!");

    }

}


// ================= ADD DOCTOR =================

function addDoctor() {

    alert(
        "Add Doctor feature will be connected to the database later."
    );

}


// ================= LOGOUT =================

function logoutAdmin() {

    let confirmation = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmation) {

        // Later this can redirect to the actual admin login page
        window.location.href = "admin_login.html";

    }

}

