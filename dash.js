import zwus from 'zwus';

const textarea = document.getElementById('textarea');
const encoderDropdown = document.getElementById('encoder');
const cipherDropdown = document.getElementById('cipher');
document.getElementById('encodeButton').addEventListener('click', ACT);
document.getElementById('decodeButton').addEventListener('click', ACT);

function ACT(event) {
    if (textarea.value === '') {
        textarea.value = 'The text box is empty.';
        return;
    }

    const op = event.target.id === 'encodeButton' ? 'NO' : 'YES';
    textarea.value = DESCRY[op]['PLAIN'](textarea.value, encoderDropdown.value.split('-')[1]);

    if (op === 'NO') {
        textarea.select();
        document.execCommand('copy');
        textarea.value = 'Copied to your clipboard.\n A copy has been placed between these brackets [' + textarea.value + ']';
    }
}

var DESCRY = {
    NO: {
        PLAIN: (ptStr, base) => zwus.encodeString(ptStr, base)
    },
    YES: {
        PLAIN: (ptStr, base) => zwus.decodeToString(ptStr, base)
    }
};
