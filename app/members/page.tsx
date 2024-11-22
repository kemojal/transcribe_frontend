"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Owner';
  avatarUrl: string;
}

const MemberRow: React.FC<{ member: Member; onRoleChange: (id: string, newRole: string) => void; onRemove: (id: string) => void }> = ({ member, onRoleChange, onRemove }) => (
  <div className="flex items-center justify-between py-3 border-b">
    <div className="flex items-center">
      <Image src={member.avatarUrl} alt={member.name} width={40} height={40} className="rounded-full mr-3" />
      <div>
        <div className="font-semibold">{member.name}</div>
        <div className="text-sm text-gray-500">{member.email}</div>
      </div>
    </div>
    <div className="flex items-center">
      <select
        value={member.role}
        onChange={(e) => onRoleChange(member.id, e.target.value)}
        className="mr-4 px-2 py-1 border rounded-md"
      >
        <option value="Admin">Admin</option>
        <option value="Member">Member</option>
        <option value="Owner">Owner</option>
      </select>
      <button
        onClick={() => onRemove(member.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  </div>
);

const AddMemberForm: React.FC<{ onAdd: (member: Omit<Member, 'id' | 'avatarUrl'>) => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Member['role']>('Member');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, email, role });
    setName('');
    setEmail('');
    setRole('Member');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="px-3 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-3 py-2 border rounded-md"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Member['role'])}
          className="px-3 py-2 border rounded-md"
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Owner">Owner</option>
        </select>
      </div>
      <button type="submit" className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-150 ease-in-out">
        Add Member
      </button>
    </form>
  );
};

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Robert Fox', email: 'robert@hyperloopx.com', role: 'Admin', avatarUrl: '/avatars/robert.jpg' },
    { id: '2', name: 'Kathryn Murphy', email: 'kathryn@openmind.com', role: 'Member', avatarUrl: '/avatars/kathryn.jpg' },
    { id: '3', name: 'Eleanor Pena', email: 'eleanor@mavenai.com', role: 'Member', avatarUrl: '/avatars/eleanor.jpg' },
    { id: '4', name: 'Guy Hawkins', email: 'guyc@digicraft.com', role: 'Owner', avatarUrl: '/avatars/guy.jpg' },
    { id: '5', name: 'Floyd Miles', email: 'floyd@cloudforge.com', role: 'Admin', avatarUrl: '/avatars/floyd.jpg' },
  ]);

  const handleRoleChange = (id: string, newRole: string) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, role: newRole as Member['role'] } : member
    ));
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const handleAdd = (newMember: Omit<Member, 'id' | 'avatarUrl'>) => {
    const id = (members.length + 1).toString();
    setMembers([...members, { ...newMember, id, avatarUrl: '/avatars/placeholder.jpg' }]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
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
                item === 'Members' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Members</h1>

        <AddMemberForm onAdd={handleAdd} />

        <div className="bg-white rounded-lg shadow p-6">
          {members.map(member => (
            <MemberRow
              key={member.id}
              member={member}
              onRoleChange={handleRoleChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Allowed email domains</h2>
          <p className="text-gray-600 mb-4">Emails from these domains get automatic space access.</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-150 ease-in-out">
            Add a domain
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;