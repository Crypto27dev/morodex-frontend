import { createReducer } from '@reduxjs/toolkit'
import {
  Field,
  replaceSwapState,
  selectCurrency,
  setRecipient,
  switchCurrencies,
  typeInput,
  updateDerivedPairData,
  updatePairData,
} from './actions'
import { DerivedPairDataNormalized, PairDataNormalized } from './types'

export interface SwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address, or null if swap should go to sender
  readonly recipient: string | null
  readonly pairDataById: Record<number, Record<string, PairDataNormalized>> | null
  readonly derivedPairDataById: Record<number, Record<string, DerivedPairDataNormalized>> | null
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currencyId: '',
  },
  pairDataById: {},
  derivedPairDataById: {},
  recipient: null,
}

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceSwapState,
      (state, { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } }) => {
        return {
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
          },
          independentField: field,
          typedValue,
          recipient,
          pairDataById: state.pairDataById,
          derivedPairDataById: state.derivedPairDataById,
        }
      },
    )
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { currencyId },
      }
    })
    .addCase(switchCurrencies, (state) => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      }
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
    .addCase(updatePairData, (state, { payload: { pairData, pairId, timeWindow } }) => {
      if (!state.pairDataById[pairId]) {
        state.pairDataById[pairId] = {}
      }
      state.pairDataById[pairId][timeWindow] = pairData
    })
    .addCase(updateDerivedPairData, (state, { payload: { pairData, pairId, timeWindow } }) => {
      if (!state.derivedPairDataById[pairId]) {
        state.derivedPairDataById[pairId] = {}
      }
      state.derivedPairDataById[pairId][timeWindow] = pairData
    }),
)
