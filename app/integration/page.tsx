import React from 'react';
import Image from 'next/image';

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: string;
  isHighlighted?: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, description, icon, isHighlighted = false }) => (
  <div className={`p-4 rounded-lg ${isHighlighted ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-white'} shadow-sm`}>
    <Image src={`/icons/${icon}`} alt={`${name} icon`} width={40} height={40} className="mb-2" />
    <h3 className="font-semibold mb-1">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const IntegrationsPage: React.FC = () => {
  const integrations = [
    {
      name: 'Atlassian JIRA',
      description: 'Plan, track, and release great software.',
      icon: 'jira.svg',
    },
    {
      name: 'Hubspot',
      description: 'Sync contact and activity data between Dialin and hub',
      icon: 'hubspot.svg',
      isHighlighted: true,
    },
    {
      name: 'GitHub',
      description: 'Link pull requests and automate workflows.',
      icon: 'github.svg',
    },
    {
      name: 'Zapier',
      description: 'Build custom automations and integrations with apps.',
      icon: 'zapier.svg',
    },
    {
      name: 'Notion',
      description: 'Streamline software projects, sprints, and bug tracking.',
      icon: 'notion.svg',
    },
    {
      name: 'Slack',
      description: 'Streamline software projects, sprints, and bug tracking.',
      icon: 'slack.svg',
    },
    {
      name: 'Zendesk',
      description: 'Streamline software projects, sprints, and bug tracking.',
      icon: 'zendesk.svg',
    },
    {
      name: 'Google Drive',
      description: 'Link your Google account to share files across your entire team.',
      icon: 'google-drive.svg',
    },
    {
      name: 'Figma',
      description: 'A collaborative design Figma helps build meaningful products.',
      icon: 'figma.svg',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Image
              src="/placeholder-avatar.jpg"
              alt="Dianne Russell"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-2 font-semibold">Dianne Russell</span>
          </div>
        </div>
        <nav className="mt-4">
          <div className="px-4 py-2 text-sm font-medium text-gray-600">Your account</div>
          {['Profile', 'Preferences', 'Notifications', 'Referrals', 'Blocklist'].map((item) => (
            <a key={item} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {item}
            </a>
          ))}
          <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-600">Workspace</div>
          {['General', 'Members', 'Groups', 'Phone numbers', 'Integrations', 'Plan & billing', 'Contacts'].map((item) => (
            <a
              key={item}
              href="#"
              className={`block px-4 py-2 text-sm ${
                item === 'Integrations' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Integrations</h1>
          <button className="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.name}
              name={integration.name}
              description={integration.description}
              icon={integration.icon}
              isHighlighted={integration.isHighlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;