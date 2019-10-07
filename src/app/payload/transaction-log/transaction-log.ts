/**
 * Interface para armazenamento dos dados de
 * um log de transação.
 */

export interface TransactionLog {
	groupOwnerId: number;
	nsuTerminal: string;
	unitId: number;
	unitName: string;
	userId: number;
	userName: string;
	terminalId: string;
	functionalityId: number;
	functionalityName: string;
	dateTime: Date;
	amount: number;
	status: string;
}