import './styles.css'

class Popover {
	constructor(buttonElement) {
		this.button = buttonElement;
		this.popover = null;
		this.isVisible = false;

		this.button.addEventListener('click', (e) => {
			e.stopPropagation();
			this.toggle();
		});

		document.addEventListener('click', () => {
			if (this.isVisible) {
				this.hide();
			}
		});
	}

	create() {
		this.popover = document.createElement('div');
		this.popover.className = 'popover';

		const header = document.createElement('h3');
		header.className = 'popover-header';
		header.textContent = 'Popover title';

		const body = document.createElement('div');
		body.className = 'popover-body';
		body.innerHTML = "And here's some amazing content.<br>It's very engaging. Right?";

		this.popover.appendChild(header);
		this.popover.appendChild(body);

		this.button.parentNode.insertBefore(this.popover, this.button);
		this.popover.style.display = 'none';
	}

	show() {
		if (!this.popover) {
			this.create();
		}
		this.popover.style.display = 'block';
		this.isVisible = true;
	}

	hide() {
		if (this.popover) {
			this.popover.style.display = 'none';
		}
		this.isVisible = false;
	}

	toggle() {
		if (this.isVisible) {
			this.hide();
		} else {
			this.show();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const button = document.getElementById('popoverButton');
	new Popover(button);
});