import React from 'react';
import { Crown } from "lucide-react";
import "../app/assets/premium.css";

const PremiumButton = () => {
    return (
        <a href="#" className="btn-shine flex items-center gap-2">
            <Crown size={20} className="text-yellow-500" />
            Premium
        </a>
    );
};

export default PremiumButton;
