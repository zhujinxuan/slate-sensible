const mentions = [
    '{$ User-id }',
    '{$ User-cat }',
    '{$ User-Address }',
    '{$ User First Name }',
    '{$ User Last Name }',
    '{$ User Middle Name }',
    '{$ A Company Address }',
    '{$ B Company Address }',
    '{$ C Company Address }',
    '{$ D Company Address }',
    '{$ E Company Address }',
    '{$ F Company Address }',
    '{$ G Company Address }',
    '{$ H Company Address }',
    '{$ I Company Address }',
    '{$ J Company Address }',
    '{$ K Company Address }',
    '{$ L Company Address }',
    '{$ M Company Address }',
    '{$ N Company Address }',
    '{$ O Company Address }'
];
export default mentions.map(x => ({ name: x }));
