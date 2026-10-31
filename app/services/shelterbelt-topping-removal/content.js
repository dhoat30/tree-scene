import { coverageSummary } from "@/utils/serviceAreas";

export const serviceSlug = 'shelterbelt-topping-removal';
export const serviceTitle = 'Shelterbelt Topping & Removal';
export const serviceDescription = 'Controlled shelterbelt topping, height reduction and removal in Tauranga and the Bay of Plenty. Specialist grapple crane equipment. Request a free quote.';
export const serviceImage = '/images/shelterbelt/shelter-belt-reduction.jpg';

export const faqs = [
  ['Can you reduce the height of a tall shelterbelt?', 'Yes. We assess the species, condition, structural stability and access before agreeing on a practical cutting height. The amount we can reduce depends on the trees and the site.'],
  ['Is topping suitable for every shelterbelt?', 'No. Trees respond differently depending on species, age, condition and the severity of the reduction. Significant topping can cause stress, dieback or poor regrowth. We discuss the relevant risks and suitable options during your assessment.'],
  ['Can you remove an entire shelterbelt?', 'Yes. We undertake complete shelterbelt removal, including conifers and Casuarina, from small sections to long orchard and rural boundaries. Chipping, log stacking and waste removal can be included in your quote.'],
  ['Can you work near buildings and fences?', 'Potentially, yes. Our grapple crane can grip and support suitable sections during cutting. We assess truck access, ground conditions, crane capacity, overhead services and surrounding structures before confirming the method.'],
  ['What is GMT 50 Total Tree Control?', 'It is a crane-mounted grapple saw system designed to grip, cut and handle suitable tree sections. The operator can guide cut material towards an agreed landing area within the equipment’s operating limits.'],
  ['Do you remove branches, logs and stumps?', 'We can chip branches, leave woodchips on site, cut and stack logs, or arrange green waste removal. Stump grinding is an additional service where separately quoted. Your quotation confirms the cleanup options included.'],
  ['How much does shelterbelt topping or removal cost?', 'The quote depends on the shelterbelt’s height and length, tree condition, access, surrounding hazards and the cleanup required. Contact us for a free quote based on your property and the scope of work.'],
  ['Which areas do you cover?', coverageSummary],
];

// Use the same section schemas as CMS-authored service pages.
const quote = { title: 'Request a free quote', url: '/hedge-shelterbelt-trimming-quote' };
const craneImage = {
  url: serviceImage,
  sizes: { large: serviceImage },
  width: 1536,
  height: 1152,
  alt: 'Treescene grapple saw crane truck working beside trees and homes',
};
const truckImage = {
  url: '/images/shelterbelt/crane-arm-hold.jpg',
  sizes: { large: '/images/shelterbelt/crane-arm-hold.jpg' },
  width: 682,
  height: 693,
  alt: 'Crane-mounted grapple holding a cut palm section above Treescene’s truck',
};

export const sections = [
  {
    acf_fc_layout: 'hero_section',
    layout: 'rows',
    subtitle: 'Tauranga & Bay of Plenty',
    title: '<h1>Shelterbelt <strong>Topping & Removal</strong></h1>',
    description: '<p>More sunlight. A manageable shelterbelt. A carefully planned result.</p><p>Overgrown shelterbelt blocking the light or outgrowing your property? We provide controlled height reduction and complete removal for orchards, farms, lifestyle blocks and residential boundaries.</p>',
    cta_array: [{ cta_link: quote }, { cta_link: { title: 'Call 021 242 0305', url: 'tel:0212420305' } }],
    cta_microcopy: '25+ years of industry experience · Specialist grapple crane equipment',
    graphic_type: 'youtube_video',
    youtube_video_group: { youtube_id: 'ikUCf6dwPAg', placeholder_image: craneImage },
  },
  {
    acf_fc_layout: 'services',
    subtitle: 'The right approach for your shelterbelt',
    title: 'Reduce the height. Or make a fresh start.',
    description: '<p>Whether you want to retain your shelterbelt or remove it completely, we assess the trees, access and surroundings before recommending a practical approach.</p>',
    card: [
      {
        title: 'Topping & height reduction',
        description: '<p>Bring an established shelterbelt back to an agreed, manageable height where the species and condition allow.</p><ul><li>Tall and overgrown shelterbelts</li><li>Excessive shade and lost sunlight</li><li>Orchard, farm and boundary shelterbelts</li></ul>',
      },
      {
        title: 'Complete shelterbelt removal',
        description: '<p>Remove shelterbelts that are dead, declining, storm-damaged or no longer suitable for your property.</p><ul><li>Small sections or entire boundaries</li><li>Conifers, Casuarina and other species</li><li>Controlled dismantling of suitable sections</li></ul>',
      },
      {
        title: 'Chipping & site cleanup',
        description: '<p>Choose what happens to the cut material, with the scope clearly agreed in your quotation.</p><ul><li>Branch chipping and on-site woodchips</li><li>Logs cut and stacked to agreed lengths</li><li>Waste removal; stump grinding quoted separately</li></ul>',
      },
    ],
    cta_group: { cta: quote },
  },
  {
    acf_fc_layout: 'row',
    subtitle: 'Specialist equipment. Greater control.',
    title: 'Grip. Cut. Move with control.',
    description: '<p>Our specialist grapple crane supports controlled shelterbelt topping, reduction and removal. We assess your trees, access and surroundings before recommending the method and agreeing on the scope.</p><p>Not every shelterbelt tolerates a substantial reduction. We consider the species, age and condition, and explain risks of stress, dieback or poor regrowth before work is agreed.</p><p>Our equipment is also used for <a href="/services/tree-removal">controlled large-tree removal</a>.</p>',
    image_alignment: 'left',
    image: truckImage,
    bullet_points: [],
    cta_group: { cta: { title: 'Explore our grapple saw crane truck', url: '/equipment/grapple-saw-crane-truck' }, cta_type: 'outlined' },
  },
  {
    acf_fc_layout: 'benefits_grid',
    title: 'Why Choose Our 4x4 Grapple Saw Crane Truck?',
    description: 'Specialist equipment for controlled cutting, flexible access and efficient shelterbelt management.',
    cta_group: { cta: quote },
    items: [
      {
        title: 'GMT 50 – Total Tree Control Technology',
        description: '<p>Treescene NZ Ltd uses a powerful 4x4 crane truck fitted with a Palfinger crane and the advanced GMT 50 Total Tree Control grapple system.</p><p>This specialist combination gives our operators greater control when gripping, cutting and handling suitable tree sections.</p>',
      },
      {
        title: 'Up to 20 Metres of Crane Reach',
        description: '<p>Our crane provides up to approximately 20 metres of reach, depending on setup and operating conditions.</p><p>This helps our team access elevated branches and tall shelterbelt sections from a suitable truck position, potentially reducing the need for repeated repositioning or extensive manual climbing.</p>',
      },
      {
        title: 'Grip, Cut & Control',
        description: '<p>One of the biggest advantages of our GMT 50 system is its ability to hold a tree section during cutting.</p><p>Rather than allowing every cut branch to fall freely, the operator can grip, cut and move suitable material in a controlled manner.</p><p>This can improve precision and help manage risks around buildings, fences, gardens and other surrounding features.</p>',
      },
      {
        title: 'Powerful 4x4 Access',
        description: '<p>Our 4x4 truck is designed to support operations on suitable rural, orchard and lifestyle properties.</p><p>Its off-road capability provides additional flexibility when accessing working areas, subject to ground conditions, slopes, vehicle weight and site safety.</p>',
      },
      {
        title: 'Efficient Shelterbelt Topping',
        description: '<p>Tall shelterbelts often involve repetitive cutting along long boundaries.</p><p>Our grapple crane allows operators to work through suitable sections systematically, making it a valuable tool for large-scale topping, reduction and removal projects.</p>',
      },
      {
        title: 'Less Manual Handling',
        description: '<p>By mechanically gripping and moving suitable branches and logs, our equipment can reduce the amount of manual lifting, dragging and handling required by ground crews.</p>',
      },
      {
        title: 'Controlled Working Near Obstacles',
        description: '<p>The grapple crane is particularly useful when working near houses, fences, orchards, sheds and other obstacles, where site conditions permit safe crane positioning and lifting.</p><p>Our team plans the work carefully, including exclusion zones, landing areas and appropriate protection of surrounding property.</p>',
      },
      {
        title: 'Integrated Chipping & Waste Management',
        description: '<p>We can combine our grapple crane with arborist trucks, wood chippers, diggers and tipper trucks to provide a complete tree management service.</p><p>Depending on your requirements, we can chip branches, leave woodchips on site, stack logs or remove green waste from your property.</p>',
      },
    ],
  },
  { acf_fc_layout: 'usp' },
  {
    acf_fc_layout: 'new_process',
    title: '<h2>A clear plan for <strong>your property</strong></h2>',
    cards: [
      { title: 'Tell us what you need', description: '<p>Let us know your location, the approximate shelterbelt length and height, and whether you’re considering reduction or removal.</p>' },
      { title: 'We assess & quote', description: '<p>We check tree condition, access, surrounding structures, overhead services and working areas, then agree on the scope and cleanup.</p>' },
      { title: 'Our team handles the work', description: '<p>We plan the cutting, exclusion zones and landing areas, then complete the work and manage the material as quoted.</p>' },
    ],
  },
  {
    acf_fc_layout: 'local_faq',
    section_title: 'Your shelterbelt questions, answered',
    section_description: 'Need advice about your particular property? Call our team on 021 242 0305.',
    items: faqs.map(([question, answer]) => ({ question, answer })),
  },
  {
    acf_fc_layout: 'cta_section',
    title: 'Ready to reclaim your sunlight & space?',
    description: 'Talk to Treescene about shelterbelt topping, height reduction or complete removal. Serving Tauranga, Mount Maunganui, Papamoa, Te Puna, Omokoroa, Katikati, Te Puke and the wider Bay of Plenty.',
    cta: [{ link: quote }],
  },
];
