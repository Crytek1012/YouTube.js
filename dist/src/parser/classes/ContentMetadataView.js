import { YTNode } from '../helpers.js';
import { Text } from '../misc.js';
import { Parser } from '../index.js';
import AvatarStackView from './AvatarStackView.js';
import BadgeView from './BadgeView.js';
export default class ContentMetadataView extends YTNode {
    static type = 'ContentMetadataView';
    metadata_rows;
    delimiter;
    constructor(data) {
        super();
        this.metadata_rows = Array.isArray(data.metadataRows)
            ? data.metadataRows.map((row) => ({
                metadata_parts: Array.isArray(row.metadataParts)
                    ? row.metadataParts.map((part) => ({
                        text: part.text ? Text.fromAttributed(part.text) : null,
                        avatar_stack: Parser.parseItem(part.avatarStack, AvatarStackView),
                        enable_truncation: data.enableTruncation
                    }))
                    : [],
                badges: Parser.parseArray(row.badges, BadgeView)
            }))
            : [];
        this.delimiter = data.delimiter ?? ' • ';
    }
}
//# sourceMappingURL=ContentMetadataView.js.map