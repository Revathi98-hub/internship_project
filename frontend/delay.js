const eqptOptions = {
    '01': [
        { code: 'CT-1', label: 'CT-1' },
        { code: 'CT-2', label: 'CT-2' },
        { code: 'GPL-1', label: 'GPL-1' },
        { code: 'GPL-2', label: 'GPL-2' },
        { code: 'WBRC', label: 'WBRC' },
        { code: 'STKR', label: 'STKR' },
        { code: 'SCR', label: 'SCR' },
    ],
    '02': [
        { code: 'OT-5', label: 'OT-5' },
        { code: 'LOCP', label: 'LOCP' },
        { code: 'OT-1', label: 'OT-1' },
        { code: 'OT-2', label: 'OT-2' },
        { code: 'OT-3', label: 'OT-3' },
        { code: 'BRC', label: 'BRC' },
        { code: 'WBRC', label: 'WBRC' },
        { code: 'OT-4', label: 'OT-4' },
        { code: 'LOCP-2', label: 'LOCP-2' },
    ],
    '03': [
        { code: 'BATTERY-5', label: 'BATTERY-5' },
        { code: 'BATTERY-1', label: 'BATTERY-1' },
        { code: 'BATTERY-2', label: 'BATTERY-2' },
        { code: 'BATTERY-3', label: 'BATTERY-3' },
        { code: 'BATTERY-4', label: 'BATTERY-4' },
        { code: 'CCP', label: 'CCP' },
        { code: 'CPP', label: 'CPP' },
        { code: 'CSP', label: 'CSP' },
    ],
    '04': [
        { code: 'RMB', label: 'RMB' },
        { code: 'M/C-1', label: 'M/C-1' },
        { code: 'M/C-2', label: 'M/C-2' },
        { code: 'BRC', label: 'BRC' },
        { code: 'WBRC', label: 'WBRC' },
        { code: 'M/C-3', label: 'M/C-3' },
        { code: 'RMPP', label: 'RMPP' },
    ],
    '05': [
        { code: 'PCM', label: 'PCM' },
        { code: 'F/C-3', label: 'F/C-3' },
        { code: 'F/C-1', label: 'F/C-1' },
        { code: 'F/C-2', label: 'F/C-2' },
        { code: 'BHS', label: 'BHS' },
        { code: 'HMDP CR', label: 'HMDP CR' },
        { code: 'LRS CR', label: 'LRS CR' },
        { code: 'MCS', label: 'MCS' },
        { code: 'PSY CR', label: 'PSY CR' },
        { code: 'SSY CR', label: 'SSY CR' },
        { code: 'TLRS CR', label: 'TLRS CR' },
    ],
    '06': [
        { code: 'CONV-A', label: 'CONV-A' },
        { code: 'CONV-B', label: 'CONV-B' },
        { code: 'CONV-C', label: 'CONV-C' },
        { code: 'CCM-1', label: 'CCM-1' },
        { code: 'CCM-2', label: 'CCM-2' },
        { code: 'CCM-3', label: 'CCM-3' },
        { code: 'CCM-4', label: 'CCM-4' },
        { code: 'CCM-5', label: 'CCM-5' },
        { code: 'CCM-6', label: 'CCM-6' },
        { code: 'CCM-7', label: 'CCM-7' },
        { code: 'BSY', label: 'BSY' },
        { code: 'MIXER-1', label: 'MIXER-1' },
        { code: 'MIXER-2', label: 'MIXER-2' },
        { code: 'ALL', label: 'ALL' },
    ],
    '07': [
        { code: 'BAR MILL', label: 'BAR MILL' },
        { code: 'BILLET MIL', label: 'BILLET MIL' },
    ],
    '08': [
        { code: 'MILL', label: 'MILL' },
    ],
    '09': [
        { code: 'MILL', label: 'MILL' },
    ],
    '10': [
        { code: 'TB-5', label: 'TB-5' },
        { code: 'BOILER-1', label: 'BOILER-1' },
        { code: 'BOILER-2', label: 'BOILER-2' },
        { code: 'BOILER-3', label: 'BOILER-3' },
        { code: 'BOILER-4', label: 'BOILER-4' },
        { code: 'BOILER-5', label: 'BOILER-5' },
        { code: 'BPTS', label: 'BPTS' },
        { code: 'COB-4', label: 'COB-4' },
        { code: 'GETS', label: 'GETS' },
        { code: 'ISB', label: 'ISB' },
        { code: 'TB-1', label: 'TB-1' },
        { code: 'TB-2', label: 'TB-2' },
        { code: 'TG-1', label: 'TG-1' },
        { code: 'TG-2', label: 'TG-2' },
        { code: 'TG-3', label: 'TG-3' },
        { code: 'TG-4', label: 'TG-4' },
        { code: 'TRT', label: 'TRT' },
        { code: 'COB-5', label: 'COB-5' },
        { code: 'TG-5', label: 'TG-5' },
        { code: 'BOILER-6', label: 'BOILER-6' },
        { code: 'NEDO', label: 'NEDO' },
        { code: 'TB-4', label: 'TB-4' },
        { code: 'CPP-2', label: 'CPP-2' },
    ],
    '11': [
        { code: 'ASU-1', label: 'ASU-1' },
        { code: 'ASU-2', label: 'ASU-2' },
        { code: 'ASU-3', label: 'ASU-3' },
        { code: 'CWP-1', label: 'CWP-1' },
        { code: 'CWP-2', label: 'CWP-2' },
        { code: 'CWP-3', label: 'CWP-3' },
        { code: 'CWP-4', label: 'CWP-4' },
        { code: 'ASU-4', label: 'ASU-4' },
        { code: 'ASU-5', label: 'ASU-5' },
    ],
    '12': [
        { code: 'CH-1', label: 'CH-1' },
        { code: 'CH-2', label: 'CH-2' },
    ],
    '13': [
        { code: 'PH', label: 'PH' },
    ],
    '14': [
        { code: 'AP TRANSCO', label: 'AP TRANSCO' },
        { code: 'LBSS-', label: 'LBSS-' },
        { code: 'LBSS-1', label: 'LBSS-1' },
        { code: 'LBSS-2', label: 'LBSS-2' },
        { code: 'LBSS-3', label: 'LBSS-3' },
        { code: 'LBSS-4', label: 'LBSS-4' },
        { code: 'LBSS-5', label: 'LBSS-5' },
        { code: 'LBSS-6', label: 'LBSS-6' },
        { code: 'ML-1', label: 'ML-1' },
        { code: 'ML-3', label: 'ML-3' },
        { code: 'ML-2', label: 'ML-2' },
        { code: 'LBSS-7', label: 'LBSS-7' },
    ],
    '15': [
        { code: 'FK', label: 'FK' },
        { code: 'FK-1', label: 'FK-1' },
        { code: 'FK-2', label: 'FK-2' },
        { code: 'FK-3', label: 'FK-3' },
        { code: 'FK-4', label: 'FK-4' },
        { code: 'FK-5', label: 'FK-5' },
        { code: 'TBDB PLANT', label: 'TBDB PLANT' },
        { code: 'SK-1', label: 'SK-1' },
        { code: 'SK-2', label: 'SK-2' },
    ],
    '16': [
        { code: 'CONV-E', label: 'CONV-E' },
        { code: 'CCM-1', label: 'CCM-1' },
        { code: 'CONV-D', label: 'CONV-D' },
        { code: 'CCM-2', label: 'CCM-2' },
        { code: 'CCM-3', label: 'CCM-3' },
        { code: 'CONV-F', label: 'CONV-F' },
        { code: 'CCM-4', label: 'CCM-4' },
    ],
    '18': [
        { code: 'MILL', label: 'MILL' },
    ],
    '19': [
        { code: 'MILL', label: 'MILL' },
    ],
    '20': [
        { code: 'MILL', label: 'MILL' },
    ],
};

const eqptModOptions = {
  '01': {
    'CT-1': ['CHP'],
    'CT-2': ['CHP'],
    'GPL-1': ['GPL'],
    'GPL-2': ['GPL'],
    'WBRC': ['NONE'],
    'STKR': ['NONE'],
    'SCR': ['NONE'],
  },
  '02': {
    'OT-5': ['OCR'],
    'LOCP': ['LOCP'],
    'OT-1': ['OCR'],
    'OT-2': ['OCR'],
    'OT-3': ['OCR'],
    'BRC': ['NONE'],
    'WBRC': ['NONE'],
    'OT-4': ['OCR'],
    'LOCP-2': ['LOCP-2'],
  },
  '03': {
    'BATTERY-5': ['BATTERY'],
    'BATTERY-1': ['BATTERY'],
    'BATTERY-2': ['BATTERY'],
    'BATTERY-3': ['BATTERY'],
    'BATTERY-4': ['BATTERY'],
    'CCP': ['NONE'],
    'CPP': ['NONE'],
    'CSP': ['NONE'],
  },
  '04': {
    'RMB': ['RMB'],
    'M/C-1': ['SP'],
    'M/C-2': ['SP'],
    'BRC': ['BRC'],
    'WBRC': ['WBRC'],
    'M/C-3': ['SP'],
    'RMPP': ['RMPP'],
  },
  '05': {
    'PCM': ['NONE'],
    'F/C-3': ['BF'],
    'F/C-1': ['BF'],
    'F/C-2': ['BF'],
    'BHS': ['NONE'],
    'HMDP CR': ['HMDP CR'],
    'LRS CR': ['LRS CR'],
    'MCS': ['NONE'],
    'PSY CR': ['PSY CR'],
    'SSY CR': ['SSY CR'],
    'TLRS CR': ['TLRS CR'],
  },
  '06': {
    'CONV-A': ['CONV'],
    'CONV-B': ['CONV'],
    'CONV-C': ['CONV'],
    'CCM-1': ['CCD'],
    'CCM-2': ['CCD'],
    'CCM-3': ['CCD'],
    'CCM-4': ['CCD'],
    'CCM-5': ['CCD'],
    'CCM-6': ['CCD'],
    'CCM-7': ['CCD'],
    'BSY': ['NONE'],
    'MIXER-1': ['MIXER-1'],
    'MIXER-2': ['MIXER-2'],
    'ALL': ['CONV'],
  },
  '07': {
    'BAR MILL': ['BAR MILL'],
    'BILLET MIL': ['BILLET MILL'],
  },
  '08': {
    'MILL': ['WRM'],
  },
  '09': {
    'MILL': ['MMSM'],
  },
  '10': {
    'TB-5': ['TB-5'],
    'BOILER-1': ['BOILER-1'],
    'BOILER-2': ['BOILER-2'],
    'BOILER-3': ['BOILER-3'],
    'BOILER-4': ['BOILER-4'],
    'BOILER-5': ['BOILER-5'],
    'BPTS': ['NONE'],
    'COB-4': ['COB-4'],
    'GETS': ['NONE'],
    'ISB': ['NONE'],
    'TB-1': ['TB-1'],
    'TB-2': ['TB-2'],
    'TG-1': ['TG-1'],
    'TG-2': ['TG-2'],
    'TG-3': ['TG-3'],
    'TG-4': ['TG-4'],
    'TRT': ['TRT'],
    'COB-5': ['COB-5'],
    'TG-5': ['TG-5'],
    'BOILER-6': ['BOILER-6'],
    'NEDO': ['NONE'],
    'TB-4': ['TB-4'],
    'CPP-2': ['TG'],
  },
  '11': {
    'ASU-1': ['ASU-1'],
    'ASU-2': ['ASU-2'],
    'ASU-3': ['ASU-3'],
    'CWP-1': ['CWP-1'],
    'CWP-2': ['CWP-2'],
    'CWP-3': ['CWP-3'],
    'CWP-4': ['CWP-4'],
    'ASU-4': ['ASU-4'],
    'ASU-5': ['ASU-5'],
  },
  '12': {
    'CH-1': ['CH-1'],
    'CH-2': ['CH-2'],
  },
  '13': {
    'PH': ['PH'],
  },
  '14': {
    'AP TRANSCO': ['AP TRANSCO'],
    'LBSS-': ['LBSS-'],
    'LBSS-1': ['LBSS-1'],
    'LBSS-2': ['LBSS-2'],
    'LBSS-3': ['LBSS-3'],
    'LBSS-4': ['LBSS-4'],
    'LBSS-5': ['LBSS-5'],
    'LBSS-6': ['LBSS-6'],
    'ML-1': ['ML-1'],
    'ML-3': ['ML-3'],
    'ML-2': ['ML-2'],
    'LBSS-7': ['NONE'],
  },
  '15': {
    'FK': ['NONE'],
    'FK-1': ['FK-1'],
    'FK-2': ['FK-2'],
    'FK-3': ['FK-3'],
    'FK-4': ['FK-4'],
    'FK-5': ['FK-5'],
    'TBDB PLANT': ['TBDB PLANT'],
    'SK-1': ['NONE'],
    'SK-2': ['SK-2'],
  },
  '16': {
    'CONV-E': ['CONV2'],
    'CCM-1': ['CCD2'],
    'CONV-D': ['CONV2'],
    'CCM-2': ['CCD2'],
    'CCM-3': ['CCD2'],
    'CONV-F': ['CONV2'],
    'CCM-4': ['CCD2'],
  },
  '18': {
    'MILL': ['WRM2'],
  },
  '19': {
    'MILL': ['SBM'],
  },
  '20': {
    'MILL': ['STM'],
  },
};


// --- Master Shop placeholder mapping by sub-equipment/mode ---
const masterShopOptions = {
    'CHP': ['RMHP'],
    'GPL': ['NONE'],
    'WBRC': ['NONE'],
    'STKR': ['NONE'],
    'SCR': ['NONE'],
    'OCR': ['RMHP'],
    'LOCP': ['LOCP'],
    'LOCP-2': ['LOCP'],
    'BATTERY': ['CO'],
    'CCP': ['NONE'],
    'CPP': ['NONE'],
    'CSP': ['NONE'],
    'RMB': ['RMB'],
    'SP': ['SP'],
    'BRC': ['NONE'],
    'M/C-1': ['SP'],
    'M/C-2': ['SP'],
    'M/C-3': ['SP'],
    'RMPP': ['RMPP'],
    'PCM': ['NONE'],
    'BF': ['BF'],
    'BHS': ['NONE'],
    'HMDP CR': ['NONE'],
    'LRS CR': ['NONE'],
    'MCS': ['NONE'],
    'PSY CR': ['NONE'],
    'SSY CR': ['NONE'],
    'TLRS CR': ['NONE'],
    'CONV': ['SMS'],
    'CCD': ['CCD'],
    'BSY': ['NONE'],
    'MIXER-1': ['NONE'],
    'MIXER-2': ['NONE'],
    'ALL': ['NONE'],
    'BAR MILL': ['BAR MILL'],
    'BILLET MILL': ['BILLET MILL'],
    'WRM': ['WRM'],
    'MMSM': ['MMSM'],
    'TB-5': ['NONE'],
    'BOILER-1': ['NONE'],
    'BOILER-2': ['NONE'],
    'BOILER-3': ['NONE'],
    'BOILER-4': ['NONE'],
    'BOILER-5': ['NONE'],
    'BPTS': ['NONE'],
    'COB-4': ['NONE'],
    'GETS': ['NONE'],
    'ISB': ['NONE'],
    'TB-1': ['NONE'],
    'TB-2': ['NONE'],
    'TG-1': ['NONE'],
    'TG-2': ['NONE'],
    'TG-3': ['NONE'],
    'TG-4': ['NONE'],
    'TRT': ['NONE'],
    'TG': ['NONE'],
    'COB-5': ['NONE'],
    'TG-5': ['NONE'],
    'BOILER-6': ['NONE'],
    'NEDO': ['NONE'],
    'TB-4': ['NONE'],
    'ASU-1': ['NONE'],
    'ASU-2': ['NONE'],
    'ASU-3': ['NONE'],
    'CWP-1': ['NONE'],
    'CWP-2': ['NONE'],
    'CWP-3': ['NONE'],
    'CWP-4': ['NONE'],
    'ASU-4': ['NONE'],
    'ASU-5': ['NONE'],
    'CH-1': ['NONE'],
    'CH-2': ['NONE'],
    'PH': ['NONE'],
    'AP TRANSCO': ['NONE'],
    'LBSS-': ['NONE'],
    'LBSS-1': ['NONE'],
    'LBSS-2': ['NONE'],
    'LBSS-3': ['NONE'],
    'LBSS-4': ['NONE'],
    'LBSS-5': ['NONE'],
    'LBSS-6': ['NONE'],
    'ML-1': ['NONE'],
    'ML-3': ['NONE'],
    'ML-2': ['NONE'],
    'LBSS-7': ['NONE'],
    'FK': ['NONE'],
    'FK-1': ['NONE'],
    'FK-2': ['NONE'],
    'FK-3': ['NONE'],
    'FK-4': ['NONE'],
    'FK-5': ['NONE'],
    'TBDB PLANT': ['NONE'],
    'SK-1': ['NONE'],
    'SK-2': ['NONE'],
    'CONV2': ['SMS2'],
    'CCD2': ['CCD2'],
    'WRM2': ['WRM2'],
    'SBM': ['SBM'],
    'STM': ['STM']
};

// --- DOM Elements ---
let shopCode, eqptCode, subequip, masterShop, clearBtn, delayForm, delayFrom, delayUpto, loadingOverlay;

function initializeDOMElements() {
    shopCode = document.getElementById('shopCode');
    eqptCode = document.getElementById('eqptCode');
    subequip = document.getElementById('subequip');
    clearBtn = document.getElementById('clearBtn');
    delayForm = document.getElementById('delayForm');
    delayFrom = document.getElementById('delayFrom');
    delayUpto = document.getElementById('delayUpto');
    loadingOverlay = document.getElementById('loadingOverlay');
}

// --- Helper: Get Current IST Datetime for datetime-local ---
function getCurrentISTLocalDatetime() {
    const now = new Date('2025-06-21T12:22:00+05:30'); // Current time: 12:22 PM IST, June 21, 2025
    const istOffset = 5.5 * 60; // IST offset in minutes
    const localOffset = now.getTimezoneOffset();
    const istTime = new Date(now.getTime() + (istOffset + localOffset) * 60000);
    const pad = n => n.toString().padStart(2, '0');
    const yyyy = istTime.getFullYear();
    const MM = pad(istTime.getMonth() + 1);
    const dd = pad(istTime.getDate());
    const HH = pad(istTime.getHours());
    const mm = pad(istTime.getMinutes());
    return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
}

// --- Dropdown logic ---
function setupEventListeners() {
    if (!shopCode || !eqptCode || !subequip || !delayForm || !clearBtn || !delayFrom || !delayUpto || !loadingOverlay) {
        console.error('One or more DOM elements are missing');
        return;
    }

    shopCode.addEventListener('change', function() {
        eqptCode.innerHTML = '<option value="">Select Equipment Code</option>';
        subequip.innerHTML = '<option value="">Select Sub-Equipment</option>';
        subequip.disabled = true;
        if (eqptOptions[this.value]) {
            eqptOptions[this.value].forEach(opt => {
                const o = document.createElement('option');
                o.value = opt.code;
                o.textContent = opt.label;
                eqptCode.appendChild(o);
            });
            eqptCode.disabled = false;
        } else {
            eqptCode.disabled = true;
        }
    });

    eqptCode.addEventListener('change', function() {
        const shop = shopCode.value;
        const eqpt = eqptCode.value;
        subequip.innerHTML = '<option value="">Select Sub-Equipment</option>';
        if (
            eqptModOptions[shop] &&
            eqptModOptions[shop][eqpt] &&
            eqptModOptions[shop][eqpt].length > 0
        ) {
            eqptModOptions[shop][eqpt].forEach(mod => {
                const option = document.createElement('option');
                option.value = mod;
                option.textContent = mod;
                subequip.appendChild(option);
            });
            subequip.disabled = false;
        } else {
            subequip.disabled = true;
        }
        // Reset and disable masterShop dropdown whenever equipment changes
        if (masterShop) {
            masterShop.innerHTML = '<option value="">Select Master Shop</option>';
            masterShop.disabled = true;
        }
    });

    // --- Master Shop logic: enable and populate after subequip selection ---
    subequip.addEventListener('change', function() {
        if (!masterShop) return;
        masterShop.innerHTML = '<option value="">Select Master Shop</option>';
        const subeq = subequip.value;
        if (masterShopOptions[subeq] && masterShopOptions[subeq].length > 0) {
            masterShopOptions[subeq].forEach(shop => {
                const option = document.createElement('option');
                option.value = shop;
                option.textContent = shop;
                masterShop.appendChild(option);
            });
            masterShop.disabled = false;
        } else {
            masterShop.disabled = true;
        }
    });

    // --- Date Validation and Duration Update ---
    delayFrom.addEventListener('change', function() {
        if (this.value) {
            delayUpto.min = this.value; // Set min to prevent earlier times
            if (delayUpto.value && new Date(delayUpto.value) <= new Date(this.value)) {
                delayUpto.value = ''; // Clear invalid end time
                alert('End time must be after start time');
            }
        } else {
            delayUpto.min = ''; // Allow any time if start is empty
        }
    });

    delayUpto.addEventListener('change', function() {
        if (this.value && delayFrom.value) {
            const start = new Date(delayFrom.value);
            const toDate = new Date(this.value);
            if (toDate <= start) {
                this.value = '';
                alert('End time must be after start time');
            }
        }
    });

    // --- Form Submit Handler ---
    delayForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const start = new Date(delayFrom.value);
        const end = new Date(delayUpto.value);
        if (end < start) {
            alert('End time must be after start time');
            return;
        }

        loadingOverlay.classList.add('show');

        const data = {
            shopCode: shopCode.value,
            eqptCode: eqptCode.value,
            subequip: subequip.value,
            delayFrom: delayFrom.value, // No conversion
            delayUpto: delayUpto.value, // No conversion
            delayDesc: document.getElementById('delayDesc').value,
        };

        try {
            // Send data to backend
            const response = await fetch('https://backend-jyi3te79k-revathis-projects-e1be93d0.vercel.app/delay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                console.log('Calling showCustomAlert: Delay entry saved successfully!');
                showCustomAlert('Delay entry saved successfully!');
                delayForm.reset();
                clearBtn.click();
            } else {
                console.log('Calling showCustomAlert: Failed to save delay entry');
                showCustomAlert('Failed to save delay entry: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            showCustomAlert('Error submitting form: ' + error.message);
        } finally {
            loadingOverlay.classList.remove('show');
        }
    });

    // --- Clear Button Handler ---
    clearBtn.addEventListener('click', function() {
        delayForm.reset();
        eqptCode.innerHTML = '<option value="">Select Equipment Code</option>';
        eqptCode.disabled = true;
        subequip.innerHTML = '<option value="">Select Sub-Equipment</option>';
        subequip.disabled = true;
        delayFrom.value = getCurrentISTLocalDatetime();
        delayUpto.value = ''; // Clear but allow picker to show
        delayUpto.min = '';
    });

    // --- Logout Button Handler ---
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Enable masterShop only when subequip is selected
    const masterShop = document.getElementById('masterShop');
    if (subequip && masterShop) {
        subequip.addEventListener('change', function() {
            if (subequip.value) {
                masterShop.disabled = false;
            } else {
                masterShop.disabled = true;
            }
        });
        // Initial state
    }
}

// --- Custom Alert Function ---
function showCustomAlert(message) {
    const modal = document.getElementById('customAlert');
    const msgSpan = document.getElementById('customAlertMsg');
    const btn = document.getElementById('customAlertBtn');
    msgSpan.textContent = message;
    // Fallback: force display flex and opacity
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.zIndex = '9999';
    btn.onclick = function() {
        modal.style.display = 'none';
    };
    // Accessibility: focus OK button
    btn.focus();
}


// --- On Page Load ---
window.addEventListener('DOMContentLoaded', function() {
    initializeDOMElements();
    setupEventListeners();
    // Disable masterShop by default
    const masterShop = document.getElementById('masterShop');
    if (masterShop) masterShop.disabled = true;
    // Initialize flatpickr for Start Time
    flatpickr("#delayFrom", {
        enableTime: true,
        dateFormat: "d m Y H:i",
        defaultDate: getCurrentISTLocalDatetime(),
        onChange: function(selectedDates, dateStr, instance) {
            if (selectedDates.length) {
                delayUpto._flatpickr.set('minDate', selectedDates[0]);
            } else {
                delayUpto._flatpickr.set('minDate', null);
            }
        }
    });
    // Initialize flatpickr for End Time
    flatpickr("#delayUpto", {
        enableTime: true,
        dateFormat: "d m Y H:i",
        minDate: getCurrentISTLocalDatetime(),
        onChange: function(selectedDates, dateStr, instance) {
        }
    });
    initializeDOMElements();
    setupEventListeners();
    
    if (delayFrom && delayUpto) {
        delayFrom.value = getCurrentISTLocalDatetime();
    } else {
        console.error('Failed to initialize one or more form elements');
    }
});