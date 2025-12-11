// DOM Elements
const cube = document.getElementById('cube');
const rotateXToggle = document.getElementById('rotate-toggle');
const resetCubeBtn = document.getElementById('reset-cube');
const randomColorsBtn = document.getElementById('random-colors');
const copyCodeBtn = document.getElementById('copy-code');
const notification = document.getElementById('notification');

// Rotation controls
const rotateXSlider = document.getElementById('rotateX');
const rotateYSlider = document.getElementById('rotateY');
const rotateZSlider = document.getElementById('rotateZ');
const rotateXValue = document.getElementById('rotateX-value');
const rotateYValue = document.getElementById('rotateY-value');
const rotateZValue = document.getElementById('rotateZ-value');

// Size control
const cubeSizeSlider = document.getElementById('cubeSize');
const cubeSizeValue = document.getElementById('cubeSize-value');

// Color controls
const frontColorPicker = document.getElementById('frontColor');
const backColorPicker = document.getElementById('backColor');
const rightColorPicker = document.getElementById('rightColor');
const leftColorPicker = document.getElementById('leftColor');
const topColorPicker = document.getElementById('topColor');
const bottomColorPicker = document.getElementById('bottomColor');

// CSS code display
const cssCode = document.getElementById('css-code');

// Variables
let isAutoRotating = false;
let autoRotateInterval;
let currentRotation = {
    x: 0,
    y: 0,
    z: 0
};
let currentSize = 200;

// Initialize the cube with default values
function initCube() {
    updateCubeRotation();
    updateCubeSize();
    updateCubeColors();
    updateCSSCode();
    updateFaceFontSize();
}

// Update cube rotation based on slider values
function updateCubeRotation() {
    currentRotation.x = parseInt(rotateXSlider.value);
    currentRotation.y = parseInt(rotateYSlider.value);
    currentRotation.z = parseInt(rotateZSlider.value);
    
    cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) rotateZ(${currentRotation.z}deg)`;
    
    // Update displayed values
    rotateXValue.textContent = currentRotation.x;
    rotateYValue.textContent = currentRotation.y;
    rotateZValue.textContent = currentRotation.z;
    
    updateCSSCode();
}

// Update cube size - تم إصلاح المشكلة هنا
function updateCubeSize() {
    currentSize = parseInt(cubeSizeSlider.value);
    cubeSizeValue.textContent = currentSize;
    
    // Update cube size
    cube.style.width = `${currentSize}px`;
    cube.style.height = `${currentSize}px`;
    
    const faces = document.querySelectorAll('.cube .face');
    const translateZ = currentSize / 2;
    
    // كائن يحتوي على التحويلات الصحيحة لكل وجه
    const faceTransforms = {
        front: `rotateY(0deg) translateZ(${translateZ}px)`,
        back: `rotateY(180deg) translateZ(${translateZ}px)`,
        right: `rotateY(90deg) translateZ(${translateZ}px)`,
        left: `rotateY(-90deg) translateZ(${translateZ}px)`,
        top: `rotateX(90deg) translateZ(${translateZ}px)`,
        bottom: `rotateX(-90deg) translateZ(${translateZ}px)`
    };
    
    faces.forEach(face => {
        face.style.width = `${currentSize}px`;
        face.style.height = `${currentSize}px`;
        
        // العثور على فئة الوجه (front, back, right, left, top, bottom)
        const faceClass = Array.from(face.classList).find(cls => 
            ['front', 'back', 'right', 'left', 'top', 'bottom'].includes(cls)
        );
        
        // تطبيق التحويل المناسب إذا وجدنا فئة الوجه
        if (faceClass && faceTransforms[faceClass]) {
            face.style.transform = faceTransforms[faceClass];
        }
    });
    
    updateCSSCode();
    updateFaceFontSize();
}

// Update cube colors
function updateCubeColors() {
    const faceElements = {
        front: document.querySelector('.cube .front'),
        back: document.querySelector('.cube .back'),
        right: document.querySelector('.cube .right'),
        left: document.querySelector('.cube .left'),
        top: document.querySelector('.cube .top'),
        bottom: document.querySelector('.cube .bottom')
    };
    
    // تحديث ألوان الأوجه
    if (faceElements.front) faceElements.front.style.backgroundColor = frontColorPicker.value;
    if (faceElements.back) faceElements.back.style.backgroundColor = backColorPicker.value;
    if (faceElements.right) faceElements.right.style.backgroundColor = rightColorPicker.value;
    if (faceElements.left) faceElements.left.style.backgroundColor = leftColorPicker.value;
    if (faceElements.top) faceElements.top.style.backgroundColor = topColorPicker.value;
    if (faceElements.bottom) faceElements.bottom.style.backgroundColor = bottomColorPicker.value;
    
    updateCSSCode();
}

// Generate random colors
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Apply random colors to all faces
function applyRandomColors() {
    frontColorPicker.value = generateRandomColor();
    backColorPicker.value = generateRandomColor();
    rightColorPicker.value = generateRandomColor();
    leftColorPicker.value = generateRandomColor();
    topColorPicker.value = generateRandomColor();
    bottomColorPicker.value = generateRandomColor();
    
    updateCubeColors();
}

// Update the CSS code display
function updateCSSCode() {
    const translateZ = currentSize / 2;
    const fontSize = Math.max(16, currentSize / 12);
    
    const code = `.cube {
  width: ${currentSize}px;
  height: ${currentSize}px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) rotateZ(${currentRotation.z}deg);
  transition: transform 0.5s;
}

.cube .face {
  position: absolute;
  width: ${currentSize}px;
  height: ${currentSize}px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${fontSize}px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.cube .front  { background-color: ${frontColorPicker.value}; transform: rotateY(0deg) translateZ(${translateZ}px); }
.cube .back   { background-color: ${backColorPicker.value}; transform: rotateY(180deg) translateZ(${translateZ}px); }
.cube .right  { background-color: ${rightColorPicker.value}; transform: rotateY(90deg) translateZ(${translateZ}px); }
.cube .left   { background-color: ${leftColorPicker.value}; transform: rotateY(-90deg) translateZ(${translateZ}px); }
.cube .top    { background-color: ${topColorPicker.value}; transform: rotateX(90deg) translateZ(${translateZ}px); }
.cube .bottom { background-color: ${bottomColorPicker.value}; transform: rotateX(-90deg) translateZ(${translateZ}px); }`;
    
    cssCode.textContent = code;
}

// Update font size of cube faces
function updateFaceFontSize() {
    const faces = document.querySelectorAll('.cube .face');
    const fontSize = Math.max(16, currentSize / 12);
    
    faces.forEach(face => {
        face.style.fontSize = `${fontSize}px`;
    });
}

// Toggle auto-rotation
function toggleAutoRotation() {
    isAutoRotating = !isAutoRotating;
    
    if (isAutoRotating) {
        rotateXToggle.innerHTML = '<i class="fas fa-pause"></i> Stop Auto Rotation';
        rotateXToggle.classList.add('secondary');
        
        // بدء التدوير التلقائي
        autoRotateInterval = setInterval(() => {
            currentRotation.y = (currentRotation.y + 1) % 360;
            rotateYSlider.value = currentRotation.y;
            updateCubeRotation();
        }, 50);
    } else {
        rotateXToggle.innerHTML = '<i class="fas fa-play"></i> Toggle Auto Rotation';
        rotateXToggle.classList.remove('secondary');
        clearInterval(autoRotateInterval);
    }
}

// Reset cube to initial position
function resetCube() {
    // إعادة تعيين التدوير
    rotateXSlider.value = 0;
    rotateYSlider.value = 0;
    rotateZSlider.value = 0;
    
    // إعادة تعيين الحجم
    cubeSizeSlider.value = 200;
    
    // إيقاف التدوير التلقائي إذا كان نشطاً
    if (isAutoRotating) {
        toggleAutoRotation();
    }
    
    // تحديث التدوير والحجم
    updateCubeRotation();
    updateCubeSize();
    
    // إعادة الألوان إلى القيم الافتراضية
    frontColorPicker.value = '#3498db';
    backColorPicker.value = '#2ecc71';
    rightColorPicker.value = '#e74c3c';
    leftColorPicker.value = '#f39c12';
    topColorPicker.value = '#9b59b6';
    bottomColorPicker.value = '#1abc9c';
    
    // تحديث الألوان
    updateCubeColors();
}

// Copy CSS code to clipboard
function copyCSSCodeToClipboard() {
    const codeText = cssCode.textContent;
    
    // استخدام Clipboard API الحديث
    navigator.clipboard.writeText(codeText).then(() => {
        // إظهار الإشعار
        showNotification('CSS code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        // طريقة بديلة للمتصفحات القديمة
        copyFallback(codeText);
    });
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Fallback copy method for older browsers
function copyFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    showNotification('CSS code copied to clipboard!');
}

// Event Listeners for rotation controls
rotateXSlider.addEventListener('input', updateCubeRotation);
rotateYSlider.addEventListener('input', updateCubeRotation);
rotateZSlider.addEventListener('input', updateCubeRotation);

// Event Listener for size control
cubeSizeSlider.addEventListener('input', updateCubeSize);

// Event Listeners for color controls
frontColorPicker.addEventListener('input', updateCubeColors);
backColorPicker.addEventListener('input', updateCubeColors);
rightColorPicker.addEventListener('input', updateCubeColors);
leftColorPicker.addEventListener('input', updateCubeColors);
topColorPicker.addEventListener('input', updateCubeColors);
bottomColorPicker.addEventListener('input', updateCubeColors);

// Event Listeners for buttons
rotateXToggle.addEventListener('click', toggleAutoRotation);
resetCubeBtn.addEventListener('click', resetCube);
randomColorsBtn.addEventListener('click', applyRandomColors);
copyCodeBtn.addEventListener('click', copyCSSCodeToClipboard);

// Initialize the cube when page loads
document.addEventListener('DOMContentLoaded', initCube);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space toggles auto rotation
    if (e.code === 'Space') {
        e.preventDefault();
        toggleAutoRotation();
    }
    
    // Ctrl+R resets the cube
    if (e.code === 'KeyR' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        resetCube();
    }
    
    // Ctrl+C randomizes colors
    if (e.code === 'KeyC' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        applyRandomColors();
    }
    
    // Ctrl+D copies CSS code
    if (e.code === 'KeyD' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        copyCSSCodeToClipboard();
    }
});

// Drag interaction for manual cube rotation
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Mouse events for desktop
cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    cube.style.cursor = 'grabbing';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    // تحديث التدوير بناءً على حركة الماوس
    currentRotation.y += deltaX * 0.5;
    currentRotation.x += deltaY * 0.5;
    
    // الحفاظ على التدوير ضمن النطاق 0-360 درجة
    currentRotation.x = (currentRotation.x + 360) % 360;
    currentRotation.y = (currentRotation.y + 360) % 360;
    
    // تحديث المنزلقات والمكعب
    rotateXSlider.value = currentRotation.x;
    rotateYSlider.value = currentRotation.y;
    updateCubeRotation();
    
    previousMousePosition = { x: e.clientX, y: e.clientY };
    e.preventDefault();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.style.cursor = 'grab';
});

// Touch events for mobile devices
cube.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { 
            x: e.touches[0].clientX, 
            y: e.touches[0].clientY 
        };
        e.preventDefault();
    }
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;
    
    // تحديث التدوير بناءً على حركة اللمس
    currentRotation.y += deltaX * 0.5;
    currentRotation.x += deltaY * 0.5;
    
    // الحفاظ على التدوير ضمن النطاق 0-360 درجة
    currentRotation.x = (currentRotation.x + 360) % 360;
    currentRotation.y = (currentRotation.y + 360) % 360;
    
    // تحديث المنزلقات والمكعب
    rotateXSlider.value = currentRotation.x;
    rotateYSlider.value = currentRotation.y;
    updateCubeRotation();
    
    previousMousePosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
    };
    
    e.preventDefault();
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Double-click to reset rotation
cube.addEventListener('dblclick', (e) => {
    rotateXSlider.value = 0;
    rotateYSlider.value = 0;
    rotateZSlider.value = 0;
    updateCubeRotation();
    e.preventDefault();
});

// Handle window resize
window.addEventListener('resize', () => {
    // تحديث حجم الخط للتأكد من أنه مناسب للشاشة
    updateFaceFontSize();
});

// Export cube configuration as JSON
function exportCubeConfig() {
    const config = {
        size: currentSize,
        rotation: currentRotation,
        colors: {
            front: frontColorPicker.value,
            back: backColorPicker.value,
            right: rightColorPicker.value,
            left: leftColorPicker.value,
            top: topColorPicker.value,
            bottom: bottomColorPicker.value
        },
        cssCode: cssCode.textContent
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `cube-config-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import cube configuration from JSON file
function importCubeConfig(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            // تطبيق الإعدادات
            if (config.size) {
                cubeSizeSlider.value = config.size;
                updateCubeSize();
            }
            
            if (config.rotation) {
                rotateXSlider.value = config.rotation.x || 0;
                rotateYSlider.value = config.rotation.y || 0;
                rotateZSlider.value = config.rotation.z || 0;
                updateCubeRotation();
            }
            
            if (config.colors) {
                if (config.colors.front) frontColorPicker.value = config.colors.front;
                if (config.colors.back) backColorPicker.value = config.colors.back;
                if (config.colors.right) rightColorPicker.value = config.colors.right;
                if (config.colors.left) leftColorPicker.value = config.colors.left;
                if (config.colors.top) topColorPicker.value = config.colors.top;
                if (config.colors.bottom) bottomColorPicker.value = config.colors.bottom;
                updateCubeColors();
            }
            
            showNotification('Cube configuration imported successfully!');
        } catch (error) {
            console.error('Error importing configuration:', error);
            showNotification('Error importing configuration. Invalid file format.');
        }
    };
    reader.readAsText(file);
}

// Add export/import buttons dynamically
function addExportImportButtons() {
    const controlsSection = document.querySelector('.controls-section');
    
    const exportImportGroup = document.createElement('div');
    exportImportGroup.className = 'control-group';
    exportImportGroup.innerHTML = `
        <h3><i class="fas fa-file-export"></i> Export/Import</h3>
        <div class="cube-controls" style="margin-top: 10px;">
            <button id="export-config" class="btn secondary" style="flex: 1;">
                <i class="fas fa-download"></i> Export Config
            </button>
            <label for="import-config" class="btn secondary" style="flex: 1; cursor: pointer; text-align: center;">
                <i class="fas fa-upload"></i> Import Config
                <input type="file" id="import-config" accept=".json" style="display: none;">
            </label>
        </div>
    `;
    
    controlsSection.appendChild(exportImportGroup);
    
    // إضافة مستمعات الأحداث للزرين الجديدين
    document.getElementById('export-config').addEventListener('click', exportCubeConfig);
    document.getElementById('import-config').addEventListener('change', importCubeConfig);
}

// Initialize export/import buttons when page loads
document.addEventListener('DOMContentLoaded', addExportImportButtons);

// Help tooltip system
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            
            element.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltip) {
                element.tooltip.remove();
                element.tooltip = null;
            }
        });
    });
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', initTooltips);