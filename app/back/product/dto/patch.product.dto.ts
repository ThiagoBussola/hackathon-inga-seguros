import { PutProductDto } from './put.product.dto'

// We can use the Partial feature from TypeScript,
// which creates a new type by copying another type and making all its fields optional.
export interface PatchProductDto extends Partial<PutProductDto> {}
