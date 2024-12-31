import React from "react";
import "./LogoCarousel.css";

const LogoCarousel = () => {
    const logos = [
        "https://cdn.pwskills.com/assets/uploads/company_logos/99a1d92c-0cc2-4544-8a06-c3240212f240.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/a87137f0-d122-4293-810e-fd485055e959.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/91bac363-6af3-4d0e-b0d4-10e90d12a5de.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/cff8383c-1e41-4f6d-b738-fa5c38e80a9e.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/453a53b0-8514-4907-94a2-984d81694775.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/954aa6b2-ed45-4bf5-97e4-1d53adbc18e7.svg",
        "https://cdn.pwskills.com/assets/uploads/company_logos/43084cef-c3b9-4e51-b568-cc580a628b28.svg",
         "https://cdn.pwskills.com/assets/uploads/company_logos/551051f3-0139-41c6-b356-3e07499477cc.svg"
    ];

    return (
        <div className="carousel">
            <div className="carousel-track">
                {logos.map((logo, index) => (
                    <img src={logo} alt={`Logo ${index + 1}`} key={index} className="carousel-logo" />
                ))}
                {/* Duplicate logos for a seamless effect */}
                {logos.map((logo, index) => (
                    <img src={logo} alt={`Logo ${index + 1}`} key={`duplicate-${index}`} className="carousel-logo" />
                ))}
            </div>
        </div>
    );
};

export default LogoCarousel;
