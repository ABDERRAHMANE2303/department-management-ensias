
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const ViewCounter = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Récupérer le nombre de vues depuis localStorage
    const currentViews = localStorage.getItem('departement-gl-views');
    const viewCount = currentViews ? parseInt(currentViews) : 0;
    
    // Incrémenter le compteur
    const newViewCount = viewCount + 1;
    setViews(newViewCount);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('departement-gl-views', newViewCount.toString());
    
    console.log(`Nombre de vues de la page Département GL: ${newViewCount}`);
  }, []);

  return (
    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
      <Eye className="h-4 w-4 text-gray-600 mr-2" />
      <span className="text-sm text-gray-600">
        {views.toLocaleString()} vue{views > 1 ? 's' : ''}
      </span>
    </div>
  );
};

export default ViewCounter;
