'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function CreatePost() {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    content: '',
    imageUrl: [''],
    reportUrl: [''],
    medicalHistory: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddField = (field: 'imageUrl' | 'reportUrl') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveField = (field: 'imageUrl' | 'reportUrl', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (field: 'imageUrl' | 'reportUrl', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
        }),
      });

      if (response.ok) {
        router.refresh();
        setFormData({
          content: '',
          imageUrl: [''],
          reportUrl: [''],
          medicalHistory: '',
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical History</label>
        <textarea
          value={formData.medicalHistory}
          onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URLs</label>
        {formData.imageUrl.map((url, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="url"
              value={url}
              onChange={(e) => handleFieldChange('imageUrl', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveField('imageUrl', index)}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField('imageUrl')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        >
          Add Image URL
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Report URLs</label>
        {formData.reportUrl.map((url, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="url"
              value={url}
              onChange={(e) => handleFieldChange('reportUrl', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveField('reportUrl', index)}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField('reportUrl')}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        >
          Add Report URL
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}