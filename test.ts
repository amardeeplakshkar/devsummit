export const posts = [
    {
      id: '1',
      content: 'Ive been experiencing severe migraines for the past week. Attached are my MRI reports.',
      imageUrl: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000'
      ],
      reportUrl: [
        'https://example.com/report1.pdf',
        'https://example.com/report2.pdf'
      ],
      patient: {
        id: 'p1',
        fullName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        age: 32,
        gender: 'Female',
        medicalHistory: 'History of chronic migraines',
        reports: ['https://example.com/medical-history1.pdf'],
        verified: true,
        role: 'patient',
        doctorId: 'd1',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-03-10'),
        illness: ['Chronic Migraine'],
        symptoms: ['Severe headache', 'Visual aura', 'Nausea'],
        location: 'New York, NY',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
      },
      patientId: 'p1',
      createdAt: new Date('2024-03-10'),
      verified: false
    },
    {
      id: '2',
      content: 'Following up on my diabetes treatment. Blood sugar levels attached.',
      reportUrl: [
        'https://example.com/report3.pdf'
      ],
      imageUrl: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000'
      ],
      patient: {
        id: 'p2',
        fullName: 'Michael Chen',
        email: 'michael.c@example.com',
        age: 45,
        gender: 'Male',
        medicalHistory: 'Type 2 Diabetes diagnosed in 2020',
        reports: ['https://example.com/medical-history2.pdf'],
        verified: true,
        role: 'patient',
        doctorId: 'd1',
        createdAt: new Date('2023-12-15'),
        updatedAt: new Date('2024-03-11'),
        illness: ['Type 2 Diabetes'],
        symptoms: ['Frequent urination', 'Increased thirst', 'Fatigue'],
        location: 'San Francisco, CA',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
      },
      patientId: 'p2',
      createdAt: new Date('2024-03-11'),
      verified: true
    },
    {
      id: '3',
      content: 'Recent chest X-ray and blood work results for respiratory issues.',
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000',
      reportUrl: [
        'https://example.com/report4.pdf',
        'https://example.com/report5.pdf'
      ],
      patient: {
        id: 'p3',
        fullName: 'Emily Rodriguez',
        email: 'emily.r@example.com',
        age: 28,
        gender: 'Female',
        medicalHistory: 'Asthma since childhood',
        reports: ['https://example.com/medical-history3.pdf'],
        verified: true,
        role: 'patient',
        doctorId: 'd2',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-12'),
        illness: ['Asthma', 'Seasonal Allergies'],
        symptoms: ['Shortness of breath', 'Wheezing', 'Chest tightness'],
        location: 'Chicago, IL',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      },
      patientId: 'p3',
      createdAt: new Date('2024-03-12'),
      verified: false
    }
  ];