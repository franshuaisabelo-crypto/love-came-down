/* ============================================
   Content Data - Love Came Down
   Zion Baptist Church, Iloilo City
   Edit this file to update site content.
   ============================================ */

export const siteInfo = {
  churchName: 'Zion Baptist Church',
  eventName: 'Love Came Down',
  tagline: 'A Building Fund Event',
  location: 'Iloilo City, Philippines',
}
export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Event Details', href: '#event-details' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Register now', href: '#register' },
}
export const hero = {
  eyebrow: 'Zion Baptist Church Presents',
  headline: 'LOVE CAME DOWN',
  cta: { label: 'Register now \u00BB', href: '#register' },
}
/* ---- Jotform configuration ---- */
export const jotform = {
  url: 'https://form.jotform.com/263253276111450',
  donationUrl: 'https://form.jotform.com/263254552403048',
  tierField: 'typeOfDonation',
  tierValues: {
    standard: 'Standard (2,500)',
    premium: 'Premium (5,000)',
  },
}
/* ---- Section 2: Building Fund ---- */
export const buildingFund = {
  sectionId: 'about',
  title: 'Help Us Build a Permanent Home for Zion',
  youtubeId: 'DrIaIb-aZGU',
  paragraphs: [
    'Zion Baptist Church has served Iloilo City for over twenty years. We started as a small group of believers. Today we\u2019re a church family built on faith, love, and serving others. We\u2019ve grown a lot. But we\u2019ve always met in rented spaces and borrowed halls. We\u2019ve never had a place of our own.',
    'That\u2019s what we\u2019re building now. A permanent worship center. It will have a sanctuary for Sunday services and classrooms for Bible study and youth programs. It will also have open areas for reaching out to our neighbors. Families will gather there. Children will learn there. Anyone in the community who needs hope will have a door to walk through.',
    'Love Came Down is a step of faith. When you register or give, your money goes straight to the building fund. Every peso brings us closer to the day we break ground on a permanent home for Zion Baptist Church.',
  ],
}
/* ---- Section 3: Registration ---- */
export const registration = {
  sectionId: 'register',
  heading: 'Join Love Came Down',
  subheading: 'Help us build a permanent church home.',
  eventTitle: 'Dine Heartily, Give Meaningfully: A Christmas Dinner for a Cause',
  eventDate: 'December 13, 2026',
  eventTime: '5:00 PM to 8:00 PM',
  eventVenueName: 'Ruby Hall, Grand Xing Imperial Hotel',
  eventVenueAddress: 'H. Montinola Corner Muelle Loney Street, Brgy. President Roxas, Iloilo City Proper, Iloilo City',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ruby%20Hall%2C%20Grand%20Xing%20Imperial%20Hotel%2C%20Iloilo%20City',
  tiers: [
    {
      id: 'standard',
      name: 'Standard',
      price: 2500,
      currency: '\u20b1',
      features: [
        'Event access for 1 person',
        'Buffet Fellowship Dinner for 1 person',
        'Donation to the Zion Baptist Church Building Fund',
      ],
      highlighted: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 5000,
      currency: '\u20b1',
      badge: 'Best value',
      features: [
        'Event access for 1 person',
        'VIP seating during the program',
        'Buffet Fellowship Dinner for 1 person',
        'Donation for the Zion Baptist Church Building Fund',
        'Commemorative Token of the event',
      ],
      highlighted: true,
    },
  ],
}
/* ---- Footer ---- */
export const footer = {
  sectionId: 'contact',
  address: '2nd Floor, CPBC Building, Fajardo St, Jaro, Iloilo City, 5000 Iloilo',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=CPBC%20Building%2C%20Fajardo%20St%2C%20Jaro%2C%20Iloilo%20City',
  facebookUrl: 'https://www.facebook.com/ZionBaptistChurchIC',
  schedule: [
    { label: 'Sunday Worship', time: '9:00 AM \u2013 11:30 AM' },
  ],
  giveHeading: 'Give to the Building Fund',
  giveDescription: 'Want to give toward the building fund? You\u2019re welcome to. Every gift helps.',
  copyright: `\u00a9 ${new Date().getFullYear()} Zion Baptist Church, Iloilo City. All rights reserved.`,
}