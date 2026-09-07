
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pages = document.querySelectorAll(".page-section");
    const navItems = document.querySelectorAll(".nav-item[data-page]");
    const viewButtons = document.querySelectorAll(".view-button[data-page]");

    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menuButton");

    const notificationBtn = document.getElementById("notificationBtn");
    const notificationPopup = document.getElementById("notificationPopup");

    const doctorSearch = document.getElementById("doctorSearch");
    const specializationFilter =
        document.getElementById("specializationFilter");

    const doctorsGrid = document.getElementById("doctorsGrid");

    const detailDoctorName =
        document.getElementById("detailDoctorName");

    const detailSpecialization =
        document.getElementById("detailSpecialization");

    const detailRating =
        document.getElementById("detailRating");

    const detailQualification =
        document.getElementById("detailQualification");

    const detailExperience =
        document.getElementById("detailExperience");

    const detailConsultations =
        document.getElementById("detailConsultations");

    const detailFee =
        document.getElementById("detailFee");

    const detailAbout =
        document.getElementById("detailAbout");

    const bookDoctorBtn =
        document.getElementById("bookDoctorBtn");

    const bookingDoctorName =
        document.getElementById("bookingDoctorName");

    const bookingSpecialization =
        document.getElementById("bookingSpecialization");

    const bookingRating =
        document.getElementById("bookingRating");

    const consultationDate =
        document.getElementById("consultationDate");

    const patientConcern =
        document.getElementById("patientConcern");

    const bookingFee =
        document.getElementById("bookingFee");

    const cancelBookingBtn =
        document.getElementById("cancelBookingBtn");

    const confirmBookingBtn =
        document.getElementById("confirmBookingBtn");

    const consultationsContainer =
        document.getElementById("consultationsContainer");

    const emptyConsultations =
        document.getElementById("emptyConsultations");

    const findDoctorFromConsultations =
        document.getElementById("findDoctorFromConsultations");

    const roomDoctorName =
        document.getElementById("roomDoctorName");

    const roomSpecialization =
        document.getElementById("roomSpecialization");

    const chatContainer =
        document.getElementById("chatContainer");

    const messageInput =
        document.getElementById("messageInput");

    const sendMessageBtn =
        document.getElementById("sendMessageBtn");

    const roomConcern =
        document.getElementById("roomConcern");

    const endConsultationBtn =
        document.getElementById("endConsultationBtn");

    const patientPrescriptionList =
        document.getElementById("patientPrescriptionList");

    const paymentDoctor =
        document.getElementById("paymentDoctor");

    const paymentSpecialization =
        document.getElementById("paymentSpecialization");

    const paymentAmount =
        document.getElementById("paymentAmount");

    const paymentTotal =
        document.getElementById("paymentTotal");

    const payNowBtn =
        document.getElementById("payNowBtn");

    const completedCount =
        document.getElementById("completedCount");

    const historyTotalFees =
        document.getElementById("historyTotalFees");

    const historyTableBody =
        document.getElementById("historyTableBody");

    const emptyHistory =
        document.getElementById("emptyHistory");

    const paymentTableBody =
        document.getElementById("paymentTableBody");


    /* =====================================================
       DOCTOR DATA
    ===================================================== */

    const doctorData = {

        "Sarah Wilson": {
            name: "Dr. Sarah Wilson",
            specialization: "General Physician",
            rating: "4.8",
            reviews: "120+",
            qualification: "MBBS, MD",
            experience: "10+ Years",
            consultations: "1200+",
            fee: 500,
            about:
                "Dr. Sarah Wilson is an experienced general physician providing comprehensive primary healthcare and medical consultations."
        },

        "Michael Brown": {
            name: "Dr. Michael Brown",
            specialization: "Cardiologist",
            rating: "4.7",
            reviews: "95+",
            qualification: "MBBS, MD, DM",
            experience: "12+ Years",
            consultations: "950+",
            fee: 800,
            about:
                "Dr. Michael Brown specializes in cardiovascular health, diagnosis and treatment of heart-related conditions."
        },

        "Emily Davis": {
            name: "Dr. Emily Davis",
            specialization: "Dermatologist",
            rating: "4.9",
            reviews: "150+",
            qualification: "MBBS, MD",
            experience: "8+ Years",
            consultations: "1500+",
            fee: 700,
            about:
                "Dr. Emily Davis specializes in skin, hair and cosmetic dermatology with a patient-focused approach."
        },

        "David Miller": {
            name: "Dr. David Miller",
            specialization: "Neurologist",
            rating: "4.6",
            reviews: "87+",
            qualification: "MBBS, MD, DM",
            experience: "11+ Years",
            consultations: "870+",
            fee: 900,
            about:
                "Dr. David Miller specializes in neurological disorders and provides diagnosis and treatment for nervous system conditions."
        }
    };


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function showPage(pageId) {

        pages.forEach(page => {
            page.classList.remove("active-section");
        });

        const targetPage =
            document.getElementById(pageId);

        if (targetPage) {
            targetPage.classList.add("active-section");
        }

        navItems.forEach(item => {
            item.classList.remove("active");

            if (item.dataset.page === pageId) {
                item.classList.add("active");
            }
        });

        if (sidebar) {
            sidebar.classList.remove("mobile-open");
        }

        if (pageId === "consultations") {
            renderConsultations();
        }

        if (pageId === "history") {
            renderHistory();
        }

        if (pageId === "payments") {
            renderPayments();
        }
    }


    /* =====================================================
       SIDEBAR NAVIGATION
    ===================================================== */

    navItems.forEach(item => {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            const pageId = this.dataset.page;

            if (pageId) {
                showPage(pageId);
            }
        });
    });


    viewButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const pageId = this.dataset.page;

            if (pageId) {
                showPage(pageId);
            }
        });
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && sidebar) {

        menuButton.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");
        });
    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    if (notificationBtn && notificationPopup) {

        notificationBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            notificationPopup.classList.toggle("show");
        });

        document.addEventListener("click", function () {

            notificationPopup.classList.remove("show");
        });
    }


    /* =====================================================
       DOCTOR SEARCH
    ===================================================== */

    function renderDoctors() {

        if (!doctorsGrid) return;

        const searchText =
            doctorSearch
                ? doctorSearch.value.toLowerCase().trim()
                : "";

        const specialization =
            specializationFilter
                ? specializationFilter.value
                : "All";

        doctorsGrid.innerHTML = "";

        Object.values(doctorData).forEach(doctor => {

            const matchesSearch =
                doctor.name.toLowerCase().includes(searchText) ||
                doctor.specialization.toLowerCase().includes(searchText);

            const matchesSpecialization =
                specialization === "All" ||
                doctor.specialization === specialization;

            if (!matchesSearch || !matchesSpecialization) {
                return;
            }

            const card =
                document.createElement("div");

            card.className = "doctor-card";

            card.innerHTML = `

                <div class="doctor-card-top">

                    <div class="doctor-avatar">
                        ${getInitials(doctor.name)}
                    </div>

                    <div class="doctor-card-info">

                        <h3>
                            ${escapeHTML(doctor.name)}
                        </h3>

                        <p>
                            ${escapeHTML(doctor.specialization)}
                        </p>

                    </div>

                </div>

                <div class="doctor-rating">

                    <span>★</span>
                    ${doctor.rating}

                    <small>
                        (${doctor.reviews})
                    </small>

                </div>

                <div class="doctor-fee">
                    ₹${parseAmount(doctor.fee)}
                    <span>/ consultation</span>
                </div>

                <button
                    class="view-button"
                    data-doctor="${escapeHTML(doctor.name)}"
                >
                    View Details
                </button>
            `;

            const viewButton =
                card.querySelector(".view-button");

            viewButton.addEventListener(
                "click",
                function () {

                    const doctorName =
                        this.dataset.doctor;

                    showDoctorDetails(doctorName);
                }
            );

            doctorsGrid.appendChild(card);
        });
    }


    if (doctorSearch) {
        doctorSearch.addEventListener(
            "input",
            renderDoctors
        );
    }

    if (specializationFilter) {
        specializationFilter.addEventListener(
            "change",
            renderDoctors
        );
    }


    /* =====================================================
       DOCTOR DETAILS
    ===================================================== */

    let selectedDoctor = null;

    function showDoctorDetails(doctorName) {

        const doctor =
            doctorData[doctorName];

        if (!doctor) return;

        selectedDoctor = doctor;

        if (detailDoctorName)
            detailDoctorName.textContent = doctor.name;

        if (detailSpecialization)
            detailSpecialization.textContent =
                doctor.specialization;

        if (detailRating)
            detailRating.textContent =
                doctor.rating;

        if (detailQualification)
            detailQualification.textContent =
                doctor.qualification;

        if (detailExperience)
            detailExperience.textContent =
                doctor.experience;

        if (detailConsultations)
            detailConsultations.textContent =
                doctor.consultations;

        if (detailFee)
            detailFee.textContent =
                `₹${parseAmount(doctor.fee)}`;

        if (detailAbout)
            detailAbout.textContent =
                doctor.about;

        showPage("doctor-details");
    }


    /* =====================================================
       BOOK DOCTOR
    ===================================================== */

    if (bookDoctorBtn) {

        bookDoctorBtn.addEventListener(
            "click",
            function () {

                if (!selectedDoctor) {
                    return;
                }

                if (bookingDoctorName)
                    bookingDoctorName.textContent =
                        selectedDoctor.name;

                if (bookingSpecialization)
                    bookingSpecialization.textContent =
                        selectedDoctor.specialization;

                if (bookingRating)
                    bookingRating.textContent =
                        selectedDoctor.rating;

                if (bookingFee)
                    bookingFee.textContent =
                        `₹${parseAmount(selectedDoctor.fee)}`;

                if (consultationDate)
                    consultationDate.value = "";

                if (patientConcern)
                    patientConcern.value = "";

                document
                    .querySelectorAll(".time-slot")
                    .forEach(slot => {
                        slot.classList.remove("selected");
                    });

                selectedTime = null;

                showPage("booking");
            }
        );
    }


    /* =====================================================
       DATE MINIMUM
    ===================================================== */

    if (consultationDate) {

        const today =
            new Date().toISOString().split("T")[0];

        consultationDate.min = today;
    }


    /* =====================================================
       TIME SLOT
    ===================================================== */

    let selectedTime = null;

    document
        .querySelectorAll(".time-slot")
        .forEach(slot => {

            slot.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".time-slot")
                        .forEach(item => {
                            item.classList.remove("selected");
                        });

                    this.classList.add("selected");

                    selectedTime =
                        this.textContent.trim();
                }
            );
        });


    /* =====================================================
       CANCEL BOOKING
    ===================================================== */

    if (cancelBookingBtn) {

        cancelBookingBtn.addEventListener(
            "click",
            function () {

                showPage("find-doctor");
            }
        );
    }


    /* =====================================================
       CONFIRM BOOKING
       IMPORTANT:
       NEW APPOINTMENT = WAITING
    ===================================================== */

    if (confirmBookingBtn) {

        confirmBookingBtn.addEventListener(
            "click",
            function () {

                if (!selectedDoctor) {
                    alert("Please select a doctor.");
                    return;
                }

                if (!consultationDate ||
                    !consultationDate.value) {

                    alert("Please select a consultation date.");
                    return;
                }

                if (!selectedTime) {

                    alert("Please select a consultation time.");
                    return;
                }

                const concern =
                    patientConcern
                        ? patientConcern.value.trim()
                        : "";

                if (!concern) {

                    alert("Please enter your concern.");
                    return;
                }


                /* =========================================
                   APPOINTMENT CREATED AS WAITING
                ========================================= */

                const appointment = {

                    id: Date.now(),

                    doctorName:
                        selectedDoctor.name,

                    specialization:
                        selectedDoctor.specialization,

                    date:
                        consultationDate.value,

                    time:
                        selectedTime,

                    concern:
                        concern,

                    fee:
                        selectedDoctor.fee,

                    status:
                        "Waiting",

                    paymentStatus:
                        "Pending",

                    prescription:
                        [],

                    createdAt:
                        new Date().toISOString()
                };


                const appointments =
                    JSON.parse(
                        localStorage.getItem(
                            "patientAppointments"
                        )
                    ) || [];


                appointments.push(appointment);


                localStorage.setItem(
                    "patientAppointments",
                    JSON.stringify(appointments)
                );


                alert(
                    "Consultation request sent. Waiting for doctor approval."
                );


                showPage("consultations");

                renderConsultations();
            }
        );
    }


    /* =====================================================
       CONSULTATION FLOW
       
       WAITING
          ↓
       CONFIRMED
          ↓
       CONSULT
          ↓
       PAYMENT
          ↓
       COMPLETED
    ===================================================== */

    function renderConsultations() {

        if (!consultationsContainer) return;

        const appointments =
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || [];


        consultationsContainer.innerHTML = "";


        if (appointments.length === 0) {

            if (emptyConsultations) {
                emptyConsultations.style.display =
                    "block";
            }

            return;
        }


        if (emptyConsultations) {
            emptyConsultations.style.display =
                "none";
        }


        appointments.forEach(appointment => {

            const card =
                document.createElement("div");

            card.className =
                "consultation-card";


            let buttonHTML = "";
            let statusClass = "";
            let displayStatus =
                appointment.status;


            /* =============================================
               WAITING
               Patient has booked.
               Doctor has not accepted yet.
            ============================================= */

            if (appointment.status === "Waiting") {

                statusClass = "waiting";

                displayStatus = "Waiting";

                buttonHTML = `

                    <button
                        class="consult-button disabled"
                        disabled
                    >
                        Waiting
                    </button>
                `;
            }


            /* =============================================
               CONFIRMED
               Doctor accepted.
               But consultation time has not arrived.
            ============================================= */

            else if (
                appointment.status === "Confirmed"
            ) {

                statusClass = "confirmed";

                displayStatus = "Confirmed";


                /*
                 * IMPORTANT:
                 * Only after doctor has confirmed
                 * do we check the consultation time.
                 */

                if (isConsultationTime(appointment)) {

                    buttonHTML = `

                        <button
                            class="consult-button"
                            onclick="openConsultation(${appointment.id})"
                        >
                            Consult
                        </button>
                    `;

                } else {

                    buttonHTML = `

                        <button
                            class="consult-button disabled"
                            disabled
                        >
                            Confirmed
                        </button>
                    `;
                }
            }


            /* =============================================
               IN PROGRESS
            ============================================= */

            else if (
                appointment.status === "In Progress"
            ) {

                statusClass = "in-progress";

                displayStatus =
                    "In Progress";

                buttonHTML = `

                    <button
                        class="consult-button"
                        onclick="openConsultation(${appointment.id})"
                    >
                        Consult
                    </button>
                `;
            }


            /* =============================================
               COMPLETED
            ============================================= */

            else if (
                appointment.status === "Completed"
            ) {

                statusClass = "completed";

                displayStatus =
                    "Completed";

                buttonHTML = `

                    <button
                        class="consult-button disabled"
                        disabled
                    >
                        Completed
                    </button>
                `;
            }


            /* =============================================
               REJECTED
            ============================================= */

            else if (
                appointment.status === "Rejected"
            ) {

                statusClass = "rejected";

                displayStatus =
                    "Rejected";

                buttonHTML = `

                    <button
                        class="consult-button disabled"
                        disabled
                    >
                        Rejected
                    </button>
                `;
            }


            /* =============================================
               CARD HTML
            ============================================= */

            card.innerHTML = `

                <div class="consultation-card-header">

                    <div>

                        <h3>
                            ${escapeHTML(
                                appointment.doctorName
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                appointment.specialization
                            )}
                        </p>

                    </div>


                    <span
                        class="appointment-status ${statusClass}"
                    >
                        ${displayStatus}
                    </span>

                </div>


                <div class="consultation-details">

                    <div class="consultation-detail">

                        <span>Date</span>

                        <strong>
                            ${formatDate(
                                appointment.date
                            )}
                        </strong>

                    </div>


                    <div class="consultation-detail">

                        <span>Time</span>

                        <strong>
                            ${escapeHTML(
                                appointment.time
                            )}
                        </strong>

                    </div>


                    <div class="consultation-detail">

                        <span>Fee</span>

                        <strong>
                            ₹${parseAmount(
                                appointment.fee
                            )}
                        </strong>

                    </div>

                </div>


                <div class="consultation-concern">

                    <span>Concern</span>

                    <p>
                        ${escapeHTML(
                            appointment.concern || "—"
                        )}
                    </p>

                </div>


                <div class="consultation-card-footer">

                    ${buttonHTML}

                </div>
            `;


            consultationsContainer.appendChild(card);
        });
    }


    /* =====================================================
       CONSULTATION TIME
       
       CONSULT BUTTON BECOMES AVAILABLE
       15 MINUTES BEFORE APPOINTMENT TIME
    ===================================================== */

    function isConsultationTime(appointment) {

        if (!appointment.date ||
            !appointment.time) {

            return false;
        }


        const appointmentDate =
            new Date(
                `${appointment.date}T${convertTimeTo24Hour(
                    appointment.time
                )}`
            );


        const now =
            new Date();


        /*
         * Consultation can be joined
         * 15 minutes before the scheduled time.
         */

        const fifteenMinutesBefore =
            new Date(
                appointmentDate.getTime()
                - (15 * 60 * 1000)
            );


        /*
         * Allow consultation from
         * 15 minutes before until the
         * appointment time/end window.
         */

        return now >= fifteenMinutesBefore;
    }


    /* =====================================================
       OPEN CONSULTATION
    ===================================================== */

    window.openConsultation = function (appointmentId) {

        const appointments =
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || [];


        const appointment =
            appointments.find(
                item => item.id === appointmentId
            );


        if (!appointment) {
            return;
        }


        /*
         * Do not allow consultation
         * unless doctor has accepted.
         */

        if (
            appointment.status !== "Confirmed" &&
            appointment.status !== "In Progress"
        ) {

            alert(
                "The doctor has not confirmed this consultation yet."
            );

            return;
        }


        /*
         * If it is Confirmed, check time.
         */

        if (
            appointment.status === "Confirmed" &&
            !isConsultationTime(appointment)
        ) {

            alert(
                "The consultation is not available yet."
            );

            return;
        }


        /*
         * Change status to In Progress
         * when consultation starts.
         */

        if (
            appointment.status === "Confirmed"
        ) {

            appointment.status =
                "In Progress";


            const index =
                appointments.findIndex(
                    item => item.id === appointmentId
                );


            appointments[index] =
                appointment;


            localStorage.setItem(
                "patientAppointments",
                JSON.stringify(appointments)
            );
        }


        if (roomDoctorName) {

            roomDoctorName.textContent =
                appointment.doctorName;
        }


        if (roomSpecialization) {

            roomSpecialization.textContent =
                appointment.specialization;
        }


        if (roomConcern) {

            roomConcern.textContent =
                appointment.concern || "No concern provided.";
        }


        loadPatientPrescription(appointment);


        loadAppointmentMessages(appointmentId);


        showPage("consultation-room");
    };


    /* =====================================================
       LOAD PRESCRIPTION
       
       PATIENT CAN ONLY VIEW.
       PATIENT CANNOT CREATE PRESCRIPTIONS.
    ===================================================== */

    function loadPatientPrescription(appointment) {

        if (!patientPrescriptionList) {
            return;
        }


        const prescriptions =
            appointment.prescription || [];


        patientPrescriptionList.innerHTML = "";


        if (prescriptions.length === 0) {

            patientPrescriptionList.innerHTML = `

                <p class="no-prescription">
                    No prescription has been added by the doctor yet.
                </p>
            `;

            return;
        }


        prescriptions.forEach(prescription => {

            const item =
                document.createElement("div");

            item.className =
                "prescription-item";


            item.innerHTML = `

                <h4>
                    ${escapeHTML(
                        prescription.medicineName
                    )}
                </h4>

                <p>
                    <strong>Instructions:</strong>
                    ${escapeHTML(
                        prescription.instruction
                    )}
                </p>

                <p>
                    <strong>Duration:</strong>
                    ${escapeHTML(
                        prescription.duration
                    )}
                </p>
            `;


            patientPrescriptionList.appendChild(item);
        });
    }


    /* =====================================================
       LOAD MESSAGES
    ===================================================== */

    function loadAppointmentMessages(appointmentId) {

        if (!chatContainer) {
            return;
        }


        const allMessages =
            JSON.parse(
                localStorage.getItem(
                    "appointmentMessages"
                )
            ) || {};


        const messages =
            allMessages[appointmentId] || [];


        chatContainer.innerHTML = "";


        messages.forEach(message => {

            appendMessageToChat(
                message.text,
                message.sender
            );
        });
    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    function sendMessage() {

        if (!messageInput) {
            return;
        }


        const message =
            messageInput.value.trim();


        if (!message) {
            return;
        }


        const appointments =
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || [];


        const currentAppointment =
            appointments.find(
                appointment =>
                    appointment.status === "In Progress"
            );


        if (!currentAppointment) {

            alert(
                "No active consultation found."
            );

            return;
        }


        const appointmentId =
            currentAppointment.id;


        const allMessages =
            JSON.parse(
                localStorage.getItem(
                    "appointmentMessages"
                )
            ) || {};


        if (!allMessages[appointmentId]) {

            allMessages[appointmentId] = [];
        }


        allMessages[appointmentId].push({

            text: message,

            sender: "patient",

            time:
                new Date().toISOString()
        });


        localStorage.setItem(
            "appointmentMessages",
            JSON.stringify(allMessages)
        );


        appendMessageToChat(
            message,
            "patient"
        );


        messageInput.value = "";
    }


    if (sendMessageBtn) {

        sendMessageBtn.addEventListener(
            "click",
            sendMessage
        );
    }


    if (messageInput) {

        messageInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendMessage();
                }
            }
        );
    }


    /* =====================================================
       APPEND MESSAGE
    ===================================================== */

    function appendMessageToChat(
        message,
        sender
    ) {

        if (!chatContainer) {
            return;
        }


        const messageElement =
            document.createElement("div");


        messageElement.className =
            sender === "patient"
                ? "chat-message patient-message"
                : "chat-message doctor-message";


        messageElement.innerHTML = `

            <div class="message-bubble">
                ${escapeHTML(message)}
            </div>
        `;


        chatContainer.appendChild(
            messageElement
        );


        chatContainer.scrollTop =
            chatContainer.scrollHeight;
    }


    /* =====================================================
       END CONSULTATION
    ===================================================== */

    if (endConsultationBtn) {

        endConsultationBtn.addEventListener(
            "click",
            function () {

                const appointments =
                    JSON.parse(
                        localStorage.getItem(
                            "patientAppointments"
                        )
                    ) || [];


                const currentAppointment =
                    appointments.find(
                        appointment =>
                            appointment.status ===
                            "In Progress"
                    );


                if (!currentAppointment) {

                    alert(
                        "No active consultation found."
                    );

                    return;
                }


                localStorage.setItem(
                    "currentPaymentAppointment",
                    JSON.stringify(
                        currentAppointment
                    )
                );


                if (paymentDoctor)
                    paymentDoctor.textContent =
                        currentAppointment.doctorName;


                if (paymentSpecialization)
                    paymentSpecialization.textContent =
                        currentAppointment.specialization;


                if (paymentAmount)
                    paymentAmount.textContent =
                        `₹${parseAmount(
                            currentAppointment.fee
                        )}`;


                if (paymentTotal)
                    paymentTotal.textContent =
                        `₹${parseAmount(
                            currentAppointment.fee
                        )}`;


                showPage("payments");
            }
        );
    }


    /* =====================================================
       PAYMENT
    ===================================================== */

    if (payNowBtn) {

        payNowBtn.addEventListener(
            "click",
            function () {

                const currentAppointment =
                    JSON.parse(
                        localStorage.getItem(
                            "currentPaymentAppointment"
                        )
                    );


                if (!currentAppointment) {

                    alert(
                        "No payment is pending."
                    );

                    return;
                }


                const paymentMethodElement =
                    document.querySelector(
                        'input[name="paymentMethod"]:checked'
                    );


                const paymentMethod =
                    paymentMethodElement
                        ? paymentMethodElement.value
                        : "Online";


                const appointments =
                    JSON.parse(
                        localStorage.getItem(
                            "patientAppointments"
                        )
                    ) || [];


                const appointmentIndex =
                    appointments.findIndex(
                        appointment =>
                            appointment.id ===
                            currentAppointment.id
                    );


                if (appointmentIndex !== -1) {

                    appointments[
                        appointmentIndex
                    ].status = "Completed";


                    appointments[
                        appointmentIndex
                    ].paymentStatus = "Paid";
                }


                localStorage.setItem(
                    "patientAppointments",
                    JSON.stringify(
                        appointments
                    )
                );


                /* =========================================
                   SAVE PAYMENT
                ========================================= */

                const payments =
                    JSON.parse(
                        localStorage.getItem(
                            "patientPayments"
                        )
                    ) || [];


                payments.push({

                    id: Date.now(),

                    appointmentId:
                        currentAppointment.id,

                    doctorName:
                        currentAppointment.doctorName,

                    specialization:
                        currentAppointment.specialization,

                    amount:
                        currentAppointment.fee,

                    paymentMethod:
                        paymentMethod,

                    status:
                        "Paid",

                    date:
                        new Date().toISOString()
                });


                localStorage.setItem(
                    "patientPayments",
                    JSON.stringify(payments)
                );


                localStorage.removeItem(
                    "currentPaymentAppointment"
                );


                alert(
                    "Payment successful. Consultation completed."
                );


                renderHistory();
                renderPayments();
                renderConsultations();


                showPage("history");
            }
        );
    }


    /* =====================================================
       HISTORY
    ===================================================== */

    function renderHistory() {

        if (!historyTableBody) {
            return;
        }


        const appointments =
            JSON.parse(
                localStorage.getItem(
                    "patientAppointments"
                )
            ) || [];


        const completedAppointments =
            appointments.filter(
                appointment =>
                    appointment.status === "Completed"
            );


        historyTableBody.innerHTML = "";


        if (
            completedAppointments.length === 0
        ) {

            if (emptyHistory) {
                emptyHistory.style.display =
                    "block";
            }

        } else {

            if (emptyHistory) {
                emptyHistory.style.display =
                    "none";
            }


            completedAppointments.forEach(
                appointment => {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            ${formatDate(
                                appointment.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                appointment.doctorName
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                appointment.specialization
                            )}
                        </td>

                        <td>
                            ₹${parseAmount(
                                appointment.fee
                            )}
                        </td>

                        <td>
                            <span class="status completed">
                                Completed
                            </span>
                        </td>
                    `;


                    historyTableBody.appendChild(
                        row
                    );
                }
            );
        }


        if (completedCount) {

            completedCount.textContent =
                completedAppointments.length;
        }


        const totalFees =
            completedAppointments.reduce(
                (total, appointment) =>
                    total +
                    parseAmount(
                        appointment.fee
                    ),
                0
            );


        if (historyTotalFees) {

            historyTotalFees.textContent =
                `₹${totalFees}`;
        }
    }


    /* =====================================================
       PAYMENTS
    ===================================================== */

    function renderPayments() {

        if (!paymentTableBody) {
            return;
        }


        const payments =
            JSON.parse(
                localStorage.getItem(
                    "patientPayments"
                )
            ) || [];


        paymentTableBody.innerHTML = "";


        if (payments.length === 0) {

            paymentTableBody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        style="text-align:center;"
                    >
                        No payment records found.
                    </td>

                </tr>
            `;

            return;
        }


        payments.forEach(payment => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${formatDateOnly(
                        payment.date
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        payment.doctorName
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        payment.specialization
                    )}
                </td>

                <td>
                    ₹${parseAmount(
                        payment.amount
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        payment.paymentMethod
                    )}
                </td>

                <td>
                    <span class="status paid">
                        Paid
                    </span>
                </td>
            `;


            paymentTableBody.appendChild(row);
        });
    }


    /* =====================================================
       FIND DOCTOR FROM CONSULTATIONS
    ===================================================== */

    if (findDoctorFromConsultations) {

        findDoctorFromConsultations.addEventListener(
            "click",
            function () {

                showPage("find-doctor");
            }
        );
    }


    /* =====================================================
       EDITABLE PATIENT PROFILE
    ===================================================== */

    const editProfileBtn =
        document.getElementById(
            "editProfileBtn"
        );

    const saveProfileBtn =
        document.getElementById(
            "saveProfileBtn"
        );

    const cancelProfileBtn =
        document.getElementById(
            "cancelProfileBtn"
        );


    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePhone =
        document.getElementById(
            "profilePhone"
        );

    const profileDob =
        document.getElementById(
            "profileDob"
        );

    const profileGender =
        document.getElementById(
            "profileGender"
        );

    const profileAddress =
        document.getElementById(
            "profileAddress"
        );


    const profileDisplayName =
        document.getElementById(
            "profileDisplayName"
        );

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    const profileFields = [

        profileName,

        profileEmail,

        profilePhone,

        profileDob,

        profileGender,

        profileAddress
    ];


    /* =====================================================
       LOAD PROFILE
    ===================================================== */

    function loadPatientProfile() {

        const savedProfile =
            JSON.parse(
                localStorage.getItem(
                    "patientProfile"
                )
            );


        if (!savedProfile) {

            updateProfileHeader();

            return;
        }


        if (profileName)
            profileName.value =
                savedProfile.name ||
                "John Doe";

        if (profileEmail)
            profileEmail.value =
                savedProfile.email ||
                "";

        if (profilePhone)
            profilePhone.value =
                savedProfile.phone ||
                "";

        if (profileDob)
            profileDob.value =
                savedProfile.dob ||
                "";

        if (profileGender)
            profileGender.value =
                savedProfile.gender ||
                "";

        if (profileAddress)
            profileAddress.value =
                savedProfile.address ||
                "";


        updateProfileHeader();
    }


    /* =====================================================
       UPDATE PROFILE HEADER
    ===================================================== */

    function updateProfileHeader() {

        const name =
            profileName &&
            profileName.value.trim()
                ? profileName.value.trim()
                : "John Doe";


        if (profileDisplayName) {

            profileDisplayName.textContent =
                name;
        }


        if (profileAvatar) {

            profileAvatar.textContent =
                getInitials(name);
        }
    }


    /* =====================================================
       EDIT PROFILE
    ===================================================== */

    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            function () {

                profileFields.forEach(field => {

                    if (field) {
                        field.disabled = false;
                    }
                });


                editProfileBtn.style.display =
                    "none";

                if (saveProfileBtn)
                    saveProfileBtn.style.display =
                        "inline-block";

                if (cancelProfileBtn)
                    cancelProfileBtn.style.display =
                        "inline-block";


                if (profileName) {
                    profileName.focus();
                }
            }
        );
    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    if (saveProfileBtn) {

        saveProfileBtn.addEventListener(
            "click",
            function () {

                if (
                    !profileName ||
                    !profileName.value.trim()
                ) {

                    alert(
                        "Please enter your full name."
                    );

                    if (profileName) {
                        profileName.focus();
                    }

                    return;
                }


                const profile = {

                    name:
                        profileName.value.trim(),

                    email:
                        profileEmail
                            ? profileEmail.value.trim()
                            : "",

                    phone:
                        profilePhone
                            ? profilePhone.value.trim()
                            : "",

                    dob:
                        profileDob
                            ? profileDob.value
                            : "",

                    gender:
                        profileGender
                            ? profileGender.value
                            : "",

                    address:
                        profileAddress
                            ? profileAddress.value.trim()
                            : ""
                };


                localStorage.setItem(
                    "patientProfile",
                    JSON.stringify(profile)
                );


                updateProfileHeader();


                profileFields.forEach(field => {

                    if (field) {
                        field.disabled = true;
                    }
                });


                editProfileBtn.style.display =
                    "inline-block";

                saveProfileBtn.style.display =
                    "none";

                if (cancelProfileBtn)
                    cancelProfileBtn.style.display =
                        "none";


                alert(
                    "Profile updated successfully."
                );
            }
        );
    }


    /* =====================================================
       CANCEL PROFILE EDIT
    ===================================================== */

    if (cancelProfileBtn) {

        cancelProfileBtn.addEventListener(
            "click",
            function () {

                loadPatientProfile();


                profileFields.forEach(field => {

                    if (field) {
                        field.disabled = true;
                    }
                });


                if (editProfileBtn)
                    editProfileBtn.style.display =
                        "inline-block";

                if (saveProfileBtn)
                    saveProfileBtn.style.display =
                        "none";

                cancelProfileBtn.style.display =
                    "none";
            }
        );
    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderDoctors();

    renderConsultations();

    renderHistory();

    renderPayments();

    loadPatientProfile();


    /* =====================================================
       AUTOMATIC CONSULT BUTTON UPDATE
       
       This checks the appointment every 30 seconds.
       When a Confirmed appointment reaches the
       15-minute window, the button changes to Consult.
    ===================================================== */

    setInterval(function () {

        const consultationsPage =
            document.getElementById(
                "consultations"
            );


        if (
            consultationsPage &&
            consultationsPage.classList.contains(
                "active-section"
            )
        ) {

            renderConsultations();
        }

    }, 30000);


    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function getInitials(name) {

        if (!name) return "JD";


        const words =
            name
                .replace("Dr. ", "")
                .trim()
                .split(/\s+/);


        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();
        }


        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();
    }


    function formatDate(dateString) {

        if (!dateString) {
            return "—";
        }


        const date =
            new Date(dateString);


        if (isNaN(date.getTime())) {
            return dateString;
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    function formatDateOnly(dateString) {

        if (!dateString) {
            return "—";
        }


        const date =
            new Date(dateString);


        if (isNaN(date.getTime())) {
            return dateString;
        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    function parseAmount(value) {

        if (typeof value === "number") {
            return value;
        }


        if (!value) {
            return 0;
        }


        return Number(
            String(value)
                .replace(/[₹,]/g, "")
                .trim()
        ) || 0;
    }


    function convertTimeTo24Hour(timeString) {

        if (!timeString) {
            return "00:00";
        }


        let time =
            timeString
                .trim()
                .toUpperCase();


        /*
         * Already in HH:MM format
         */

        if (
            /^\d{1,2}:\d{2}$/.test(time)
        ) {

            const parts =
                time.split(":");

            return `${parts[0].padStart(2, "0")}:${parts[1]}`;
        }


        /*
         * AM / PM format
         */

        const match =
            time.match(
                /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
            );


        if (!match) {
            return "00:00";
        }


        let hours =
            parseInt(match[1], 10);

        const minutes =
            match[2];

        const period =
            match[3];


        if (
            period === "PM" &&
            hours !== 12
        ) {

            hours += 12;
        }


        if (
            period === "AM" &&
            hours === 12
        ) {

            hours = 0;
        }


        return `${String(hours).padStart(2, "0")}:${minutes}`;
    }


    function escapeHTML(value) {

        if (value === null ||
            value === undefined) {

            return "";
        }


        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});

