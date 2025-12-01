// Funciones específicas para manejo de edad
class AgeManager {
    constructor() {
        this.userData = null;
        this.loadUserData();
    }
    
    loadUserData() {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            this.userData = JSON.parse(savedData);
        }
    }
    
    saveUserData(name, lastName, age) {
        this.userData = { name, lastName, age };
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }
    
    getUserAgeStatus() {
        if (!this.userData || !this.userData.age) return null;
        
        const age = parseInt(this.userData.age);
        if (age > 20) {
            return { status: 'mayor', message: 'Es mayor de edad' };
        } else if (age < 20) {
            return { status: 'menor', message: 'Es menor de edad' };
        } else {
            return { status: 'igual', message: 'Tiene 20 años' };
        }
    }
    
    formatUserGreeting() {
        if (!this.userData) return 'Invitado';
        
        const ageStatus = this.getUserAgeStatus();
        return `${this.userData.name} ${this.userData.lastName} (${this.userData.age} años) - ${ageStatus.message}`;
    }
    
    calculateBirthYear() {
        if (!this.userData || !this.userData.age) return null;
        
        const currentYear = new Date().getFullYear();
        return currentYear - parseInt(this.userData.age);
    }
    
    // Validación de edad para formularios
    validateAge(age) {
        const ageNum = parseInt(age);
        
        if (isNaN(ageNum)) {
            return { valid: false, message: 'La edad debe ser un número' };
        }
        
        if (ageNum < 1 || ageNum > 120) {
            return { valid: false, message: 'La edad debe estar entre 1 y 120 años' };
        }
        
        return { valid: true, message: 'Edad válida' };
    }
    
    // Función para mostrar información de edad en diferentes formatos
    displayAgeInfo(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        if (!this.userData) {
            element.innerHTML = '<p>No hay información de usuario disponible</p>';
            return;
        }
        
        const ageStatus = this.getUserAgeStatus();
        const birthYear = this.calculateBirthYear();
        
        element.innerHTML = `
            <div class="age-info-card">
                <h3><i class="fas fa-user-circle"></i> Información del Usuario</h3>
                <div class="info-row">
                    <span class="label">Nombre completo:</span>
                    <span class="value">${this.userData.name} ${this.userData.lastName}</span>
                </div>
                <div class="info-row">
                    <span class="label">Edad:</span>
                    <span class="value">${this.userData.age} años</span>
                </div>
                <div class="info-row">
                    <span class="label">Estado:</span>
                    <span class="value status-${ageStatus.status}">${ageStatus.message}</span>
                </div>
                <div class="info-row">
                    <span class="label">Año de nacimiento:</span>
                    <span class="value">${birthYear} (aproximado)</span>
                </div>
                ${this.getAgeRecommendations()}
            </div>
        `;
        
        // Agregar estilos si no existen
        this.addAgeInfoStyles();
    }
    
    getAgeRecommendations() {
        const age = parseInt(this.userData.age);
        
        if (age < 13) {
            return `
                <div class="recommendation">
                    <h4><i class="fas fa-child"></i> Recomendaciones:</h4>
                    <p>Contenido apto para todas las edades</p>
                </div>
            `;
        } else if (age >= 13 && age < 18) {
            return `
                <div class="recommendation">
                    <h4><i class="fas fa-teenager"></i> Recomendaciones:</h4>
                    <p>Contenido supervisado por adultos</p>
                </div>
            `;
        } else {
            return `
                <div class="recommendation">
                    <h4><i class="fas fa-adult"></i> Recomendaciones:</h4>
                    <p>Acceso completo a todo el contenido</p>
                </div>
            `;
        }
    }
    
    addAgeInfoStyles() {
        if (document.getElementById('age-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'age-styles';
        style.textContent = `
            .age-info-card {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .age-info-card h3 {
                color: #4a148c;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .label {
                font-weight: 600;
                color: #333;
            }
            
            .value {
                color: #666;
            }
            
            .status-mayor {
                color: #4caf50;
                font-weight: 600;
            }
            
            .status-menor {
                color: #ff9800;
                font-weight: 600;
            }
            
            .status-igual {
                color: #2196f3;
                font-weight: 600;
            }
            
            .recommendation {
                margin-top: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #4a148c;
            }
            
            .recommendation h4 {
                color: #4a148c;
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Inicializar AgeManager globalmente
const ageManager = new AgeManager();

// Funciones globales para uso en otras páginas
window.validateUserAge = function(ageInput) {
    return ageManager.validateAge(ageInput);
};

window.displayUserAgeInfo = function(elementId) {
    return ageManager.displayAgeInfo(elementId);
};

window.getUserData = function() {
    return ageManager.userData;
};

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar información de edad si existe el elemento
    if (document.getElementById('ageInfoDisplay')) {
        ageManager.displayAgeInfo('ageInfoDisplay');
    }
    
    // Configurar validación de edad en formularios
    const ageInputs = document.querySelectorAll('input[type="number"][min="1"][max="120"]');
    
    ageInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const validation = ageManager.validateAge(this.value);
            
            if (!validation.valid) {
                this.style.borderColor = '#f44336';
                
                // Mostrar mensaje de error
                let errorDiv = this.parentElement.querySelector('.age-error');
                if (!errorDiv) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'age-error';
                    this.parentElement.appendChild(errorDiv);
                }
                errorDiv.textContent = validation.message;
                errorDiv.style.color = '#f44336';
                errorDiv.style.fontSize = '0.8rem';
                errorDiv.style.marginTop = '5px';
            } else {
                this.style.borderColor = '#4caf50';
                
                // Eliminar mensaje de error si existe
                const errorDiv = this.parentElement.querySelector('.age-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    });
});