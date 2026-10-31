// Shared service coverage for page sections, FAQs and structured data.
export const serviceAreaGroups = [
  {
    title: 'Tauranga & suburbs',
    featured: true,
    areas: ['Tauranga Central', 'Bethlehem', 'Otumoetai', 'Matua', 'Bellevue', 'Brookfield', 'Bureta', 'Judea', 'Gate Pa', 'Greerton', 'Parkvale', 'Poike', 'Tauriko', 'Pyes Pa', 'The Lakes', 'Hairini', 'Maungatapu', 'Welcome Bay', 'Ohauiti'],
  },
  {
    title: 'Mount Maunganui & Papamoa',
    areas: ['Mount Maunganui', 'Arataki', 'Bayfair', 'Papamoa', 'Papamoa Beach'],
  },
  {
    title: 'Western & inland areas',
    areas: ['Te Puna', 'Omokoroa', 'Pahoia', 'Whakamarama', 'Aongatete', 'Katikati', 'Waihi', 'Waihi Beach', 'Matamata', 'Kaimai', 'Omanawa'],
  },
  {
    title: 'Te Puke & surrounding rural areas',
    areas: ['Oropi', 'Te Puke', 'Paengaroa', 'Maketu', 'Pukehina', 'Pongakawa', 'Okere Falls'],
  },
];

export const serviceAreas = ['Tauranga', ...serviceAreaGroups.flatMap((group) => group.areas)];
export const coverageSummary = 'We cover Tauranga and its suburbs, Mount Maunganui, Papamoa and surrounding rural communities, extending to Waihi, Matamata, Paengaroa, Maketu and Okere Falls.';
