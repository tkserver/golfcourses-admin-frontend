import React from 'react';

interface CourseData {
  name: string;
  url: string;
  coursetype: string;
  address: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  web: string;
  twitter: string;
  facebook: string;
  instagram: string | null;
  rangeballs: string;
  tips: string;
  season: string;
  cost: string;
  proshop: string;
  tees: string;
  balls: string;
  instruction: string;
  locker: string;
  par: string;
  yards: string;
  rating: string;
  slope: string;
  architect: string;
  caddie: string;
  banquet: boolean;
  signaturehole: string;
  opened: string;
  greens: string;
  fairways: string;
  waterhazards: boolean;
  sandbunkers: string;
  holes: string;
  yardagemarkers: string;
  acceptteetimes: boolean;
  earliestcallteetime: string;
  trainingfacilities: string;
  onsitegolfpro: string;
  spikes: boolean;
  guests: string;
  access: string;
  discounts: string;
  rentals: boolean;
  pullcarts: string;
  walking: string;
  restaurant: string;
  bar: boolean;
  hours: string;
  food: boolean;
  availableproducts: string;
  homes: boolean;
  latitude: string;
  longitude: string;
  description: string;
  scorecard: string;
  image: string;
  region: string;
}

interface CourseFormProps {
  courseData: CourseData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  message: string;
}

const CourseForm: React.FC<CourseFormProps> = ({ courseData, handleChange, handleSubmit, message }) => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Course Form</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text Inputs */}
        {['name', 'url', 'coursetype', 'address', 'city', 'county', 'state', 'zip', 'country', 'phone', 'web', 'twitter', 'facebook', 'instagram', 'rangeballs', 'season', 'cost', 'proshop', 'tees', 'balls', 'instruction', 'locker', 'par', 'yards', 'rating', 'slope', 'architect', 'caddie', 'signaturehole', 'opened', 'greens', 'fairways', 'sandbunkers', 'holes', 'yardagemarkers', 'earliestcallteetime', 'trainingfacilities', 'onsitegolfpro', 'guests', 'access', 'discounts', 'pullcarts', 'walking', 'restaurant', 'hours', 'availableproducts', 'latitude', 'longitude', 'scorecard', 'image'].map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize font-semibold mb-2 text-gray-700" htmlFor={key}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name={key}
              id={key}
              value={(courseData as any)[key] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        
        {/* Select Input */}
        <div className="flex flex-col">
          <label className="capitalize font-semibold mb-2 text-gray-700" htmlFor="region">Region</label>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="region"
            id="region"
            value={courseData.region}
            onChange={handleChange}
          >
            <option value="">Select a region</option>
            <option value="Northern Utah">Northern Utah</option>
            <option value="Central Utah">Central Utah</option>
            <option value="Southwestern Utah">Southwestern Utah</option>
            <option value="Southeastern Utah">Southeastern Utah</option>
          </select>
        </div>
        
        {/* Checkbox Inputs */}
        {['banquet', 'waterhazards', 'acceptteetimes', 'spikes', 'rentals', 'bar', 'food', 'homes'].map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="checkbox"
              name={key}
              id={key}
              checked={(courseData as any)[key] || false}
              onChange={handleChange}
            />
            <label className="capitalize font-semibold text-gray-700" htmlFor={key}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
          </div>
        ))}
        
        {/* Text Area Inputs */}
        {['description', 'tips'].map((key) => (
          <div key={key} className="flex flex-col md:col-span-2">
            <label className="capitalize font-semibold mb-2 text-gray-700" htmlFor={key}>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
            <textarea
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name={key}
              id={key}
              value={(courseData as any)[key] || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
        ))}
        
        <div className="md:col-span-2 flex justify-between items-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md">
            Save Changes
          </button>
          {message && <p className="text-green-600 font-semibold">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
