import { Clock, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const DepartmentCard = ({ department }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full flex flex-col">
      {/* Header with color */}
      <div className={`${department.color} h-2`}></div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Department Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {department.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {department.description}
        </p>

        {/* Duration */}
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Durée: {department.duration}</span>
        </div>

        {/* Specializations */}
        <div className="mb-4 flex-grow">
          <div className="flex items-center mb-2 text-sm text-gray-700">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="font-medium">Spécialisations:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {department.specializations.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        {/* Call to Action - This will always be at the bottom */}
        <Link className={`w-full ${department.color} text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 mt-auto`}>
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;