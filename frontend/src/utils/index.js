export const logger = (desc, message) => {
    console.log('\x1b[35m', '==============');
    console.log('\x1b[35m', desc, message);
    console.log('\x1b[35m', '==============');
};

export const randomColor = () => {
    const hex = Math.floor(Math.random() * 0xffffff);
    return '#' + hex.toString(16);
};

export const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

export const stringAvatar = ({ name, width, height, style }) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width,
            height,
            fontSize: width * 0.45,
            ...style,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
};

// format slash in phone number
export const formatPhoneNumber = (phoneNumberString) => {
    phoneNumberString = String(phoneNumberString);
    return `${phoneNumberString.slice(0, 3)}-${phoneNumberString.slice(
        3,
        6
    )}-${phoneNumberString.slice(6, 10)}`;
};

// count domain req
export const countDomain = (takenCourses) => {
    let d_s = 0,
        d_a = 0,
        d_b = 0,
        d_u = 0,
        d_t = 0,
        d_c = 0,
        d_cp = 0,
        d_l1 = 0,
        d_l2 = 0,
        d_l3 = 0,
        d_q = 0,
        d_w = 0;

    for (const item of takenCourses) {
        switch (item.requirement) {
            case '1S':
                d_s += 1;
                break;
            case '2A':
                d_a += 1;
                break;
            case '3B':
                d_b += 1;
                break;
            case '4U':
                d_u += 1;
                break;
            case '5T':
                d_t += 1;
                break;
            case 'C':
                d_c += 1;
                break;
            case 'CP':
                d_cp += 1;
                break;
            case 'L1':
                d_l1 += 1;
                break;
            case 'L2':
                d_l2 += 1;
                break;
            case 'L3':
                d_l3 += 1;
                break;
            case 'Q':
                d_q += 1;
                break;
            case 'W':
                d_w += 1;
                break;
        }
    }

    return [
        {
            require: '1S',
            taken: d_s,
        },
        {
            require: '2A',
            taken: d_a,
        },
        {
            require: '3B',
            taken: d_b,
        },
        {
            require: '4U',
            taken: d_u,
        },
        {
            require: '5T',
            taken: d_t,
        },
        {
            require: 'C',
            taken: d_c,
        },
        {
            require: 'CP',
            taken: d_cp,
        },
        {
            require: 'L1',
            taken: d_l1,
        },
        {
            require: 'L2',
            taken: d_l2,
        },
        {
            require: 'L3',
            taken: d_l3,
        },
        {
            require: 'Q',
            taken: d_q,
        },
        {
            require: 'W',
            taken: d_w,
        },
    ];
};
