/**
 * Interface para armazenamento dos dados de um detalhe de abertura.
 */

export interface OpeningDetail {
    nsuTerminal: string,
	openingDateTime: Date,
	bankNotesInSafe: number,
	amountInSafe: number,
	lastClosingDateTime: Date,
	lastClosingBanknotes: number,
	lastClosingAmount: number
}