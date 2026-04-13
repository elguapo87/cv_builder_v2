import { PersonalInfo } from "@/types/resume"
import { BriefcaseBusiness, Globe, Link, LucideIcon, Mail, MapPin, Phone, User } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type BuilderProps = {
    personalData: PersonalInfo;
    onChange: (data: PersonalInfo) => void;
    removeBackground: boolean;
    setRemoveBackground: React.Dispatch<React.SetStateAction<boolean>>;
}

type PersonalInfoTextFields = Omit<PersonalInfo, "image">;

const PersonalInfoForm = ({ personalData, onChange, removeBackground, setRemoveBackground }: BuilderProps) => {

    const handleChange = <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
        onChange({
            ...personalData,
            [field]: value
        });
    };

    let imageSrc: string | StaticImageData | undefined;
    if (typeof personalData.image === "string") {
        imageSrc = personalData.image
    } else if (personalData.image instanceof File) {
        imageSrc = URL.createObjectURL(personalData.image);
    } else {
        imageSrc = personalData.image
    }

    const fields: {
        key: keyof PersonalInfoTextFields;
        label: string;
        icon: LucideIcon;
        type: string;
        required?: boolean;
    }[] = [
            { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
            { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
            { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
            { key: "location", label: "Location", icon: MapPin, type: "text" },
            { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
            { key: "linkedin", label: "Linkedin Profile", icon: Link, type: "url" },
            { key: "website", label: "Personal Website", icon: Globe, type: "url" }

        ];

    return (
        <>
            <h3 className='text-lg font-semibold text-slate-900'>Personal Information</h3>
            <p className='text-sm text-slate-800'>Get started with the personal information</p>
            <div className='flex items-center gap-2'>
                <label htmlFor="userImage">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt="User-Image"
                            width={64}
                            height={64}
                            className='w-16 h-16 rounded-full object-cover mt-5 ring
                                ring-slate-300 hover:opacity-80'
                        />
                    ) : (
                        <div
                            className='inline-flex items-center gap-2 mt-5 text-slate-600
                                hover:text-slate-700 cursor-pointer'
                        >
                            <User className='size-10 p-2.5 border rounded-full' />
                            upload user image
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={(e) => handleChange("image", e.target.files?.[0])}
                        accept="image/jpeg, image/png"
                        id="userImage"
                        hidden
                    />
                </label>

                {/* {personalData.image instanceof File && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer text-stone-100 gap-3'>
                            <input
                                onChange={() => setRemoveBackground(prev => !prev)}
                                type="checkbox"
                                checked={removeBackground}
                                className='sr-only peer'
                            />
                            <div
                                className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600
                                    transition-colors duration-200'
                            />
                            <span
                                className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full
                                    transition-transform duration-200 ease-in-out peer-checked:translate-x-4'
                            />
                        </label>
                    </div>
                )} */}
            </div>

            {fields.map((field) => {
                const Icon = field.icon;

                return (
                    <div key={field.key} className='space-y-1 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                            <Icon className='size-4' />
                            {field.label}
                            {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        <input
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            value={personalData[field.key] ?? ""} 
                            type={field.type}
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg
                                outline-blue-500 text-sm'
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required={field.required} 
                        />
                    </div>
                )
            })}
        </>
    )
}

export default PersonalInfoForm
