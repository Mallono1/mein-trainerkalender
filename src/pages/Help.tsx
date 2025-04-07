import React from 'react';
import {
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  Users,
  FileText,
} from 'lucide-react';

const Help: React.FC = () => {
  const supportOptions = [
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Find answers to your questions',
      color: 'text-blue-500',
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Explore our comprehensive guides',
      color: 'text-green-500',
    },
    {
      icon: MessageCircle,
      title: 'Community',
      description: 'Connect with other users',
      color: 'text-purple-500',
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get help from our team',
      color: 'text-red-500',
    },
    {
      icon: Users,
      title: 'Training',
      description: 'Learn how to use our product',
      color: 'text-orange-500',
    },
    {
      icon: FileText,
      title: 'Releases',
      description: "What's new and improved",
      color: 'text-teal-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            We're here to help
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Find the support you need to make the most of our platform.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {supportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <Icon
                    className={`${option.color} w-10 h-10 mr-4 group-hover:animate-pulse`}
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {option.title}
                  </h3>
                </div>
                <p className="text-gray-600">{option.description}</p>
                <div className="mt-4 text-blue-600 font-medium group-hover:underline">
                  Learn More →
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
