import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const importSource = async (path) => import(`data:text/javascript;base64,${Buffer.from(await readFile(new URL(path, import.meta.url), 'utf8')).toString('base64')}`);
const { buildServiceQuotePayload, leadResponseSucceeded } = await importSource('../utils/serviceQuoteSubmission.js');
const { quotePages } = await importSource('../utils/serviceQuotePages.js');
const { treeRemovalQuoteFormData: fields } = await importSource('../utils/treeRemovalQuoteFormData.js');
const values = { firstname: ' Alice ', lastname: 'Jones', email: ' alice@example.test ', phone: '0211234567', address: '', message: '' };

for (const config of Object.values(quotePages)) {
  test(`${config.form.serviceLabel}: lead retains service attribution with optional details blank`, () => {
    const source = `https://treescene.co.nz/${config.slug}?utm_source=test`;
    const payload = buildServiceQuotePayload(values, config.form, source);
    const crm = Object.fromEntries(payload.hubspotFormObject.map((field) => [field.name, field.value]));
    assert.equal(payload.email, 'alice@example.test');
    assert.equal(crm.firstname, 'Alice');
    assert.equal(crm.services_required, config.form.crmService);
    assert.ok(payload.message.includes(config.form.serviceLabel));
    assert.ok(payload.message.includes(source));
    assert.ok(crm.message.includes(config.form.serviceLabel));
    assert.equal(crm.address, '');
    assert.equal(payload.formName, config.form.formName);
  });
}

test('required field validation rejects missing contacts and malformed email/phone', () => {
  for (const field of fields.filter((field) => field.required)) assert.equal(field.validation(''), false, field.id);
  assert.equal(fields.find((field) => field.id === 'email').validation('not-an-email'), false);
  assert.equal(fields.find((field) => field.id === 'phone').validation('123'), false);
  for (const field of fields.filter((field) => field.required)) assert.equal(field.validation(values[field.id]), true, field.id);
});

test('upstream HubSpot error wrapped in HTTP 200 never counts as a delivered lead', () => {
  assert.equal(leadResponseSucceeded(true, { success: true, data: { status: 'error', errors: [{ message: 'Invalid field' }] } }), false);
  assert.equal(leadResponseSucceeded(false, { success: true }), false);
  assert.equal(leadResponseSucceeded(true, { success: false }), false);
  assert.equal(leadResponseSucceeded(true, { success: true, data: { inlineMessage: 'Thank you' } }), true);
  assert.equal(leadResponseSucceeded(true, { success: true, data: { id: 'accepted-mail-id' } }), true);
});
