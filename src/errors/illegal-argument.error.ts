/*
 * Author: XeroxDev <help@xeroxdev.de>
 * Copyright (c) 2021.
 *
 */

export class IllegalArgumentError extends Error {
    name = 'IllegalArgumentError';

    constructor(message: string) {
        super(message);
    }
}
