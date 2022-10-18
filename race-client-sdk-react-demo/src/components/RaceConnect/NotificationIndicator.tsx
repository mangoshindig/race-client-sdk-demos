import { FC } from "react";
import { NotificationTag
} from "../../assets/index.styles";

interface NotificationIndicatorType {
	number?: number;
}

export const NotificationIndicator: FC<NotificationIndicatorType> = ({ number }) => {
	return (
		<NotificationTag >
			{number}
		</NotificationTag>
	);
};