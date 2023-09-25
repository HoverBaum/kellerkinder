import { assertEquals } from 'https://deno.land/std@0.202.0/assert/mod.ts'
import {
  onlyModDonations,
  onlyTimerDonations,
  totalDonationsCount,
} from './findPossibleDonations.ts'
import { Donation } from './types.d.ts'

Deno.test('Filter for timer donations', () => {
  const donations: Donation[] = [
    {
      amount: 1,
      item: 'TestItem',
      target: 'Timer',
    },
    {
      amount: 2,
      item: 'TestItem 2',
      target: 'DerElky',
    },
    {
      amount: 1,
      item: 'TestItem 3',
      target: 'DerElky',
    },
  ]

  assertEquals(donations.filter(onlyTimerDonations).length, 1)
  assertEquals(donations.filter(onlyTimerDonations)[0].target, 'Timer')
})

Deno.test('Filter for mod donations', () => {
  const donations: Donation[] = [
    {
      amount: 1,
      item: 'TestItem',
      target: 'Timer',
    },
    {
      amount: 2,
      item: 'TestItem 2',
      target: 'DerElky',
    },
    {
      amount: 1,
      item: 'TestItem 3',
      target: 'DerElky',
    },
  ]

  assertEquals(donations.filter(onlyModDonations).length, 2)
  assertEquals(donations.filter(onlyModDonations)[0].target, 'DerElky')
})

Deno.test('Total donation amount', () => {
  const donations: Donation[] = [
    {
      amount: 3,
      item: 'TestItem',
      target: 'Timer',
    },
    {
      amount: 2,
      item: 'TestItem 2',
      target: 'DerElky',
    },
    {
      amount: 2,
      item: 'TestItem',
      target: 'DerElky',
    },
  ]

  assertEquals(totalDonationsCount(donations), 5)
})
