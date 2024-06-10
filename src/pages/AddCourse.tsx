import React, { useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const AddCourse: React.FC = () => {
    const [fileLists, setFileLists] = useState<Record<string, any>>({});

    const handleSectionUpload = (info: any, sectionIndex: number, subSectionIndex: number | null = null) => {
        const newFileList = [...info.fileList];

        setFileLists((prev) => {
            const updatedFileLists = { ...prev };
            return updatedFileLists;
        });
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        console.log('Uploaded files: ', fileLists);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Add New Course</h1>
            <Form
                name="add_course"
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="max-w-xl mx-auto">
                    <Form.Item
                        name="courseName"
                        label="Course Name"
                        rules={[{ required: true, message: 'Please input the course name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <TextArea style={{ resize: 'none' }} />
                    </Form.Item>

                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: 'Please input the course duration!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the course price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.List name="content">
                        {(fields: any, { add, remove }) => (
                            <>
                                {fields.map((field: any, index: number) => (
                                    <div key={field.key} className="bg-white p-4 mb-4 rounded-lg shadow-md">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-semibold">Section {index + 1}</h2>
                                            <Button type="link" danger onClick={() => remove(field.name)}>
                                                <MinusCircleOutlined /> Remove Section
                                            </Button>
                                        </div>
                                        <div className="flex items-baseline">
                                            <div className="flex-grow">
                                                <Form.Item
                                                    name={[field.name, 'section']}
                                                    rules={[{ required: true, message: 'Please input the section name!' }]}
                                                >
                                                    <Input placeholder="Section Name" />
                                                </Form.Item>
                                                <Form.Item
                                                    name="description"
                                                    rules={[{ required: true, message: 'Please input the description!' }]}
                                                >
                                                    <TextArea placeholder="Description" style={{ resize: 'none' }} />
                                                </Form.Item>
                                            </div>
                                            <Form.Item
                                                className="mb-0"
                                            >
                                                <Upload
                                                    name="video"
                                                    accept=".mp4"
                                                    onChange={(info) => handleSectionUpload(info, index)}
                                                >
                                                    <Button icon={<UploadOutlined />} />
                                                </Upload>
                                            </Form.Item>
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    // Add sub-section
                                                    const newSubSection = { section: '', details: '' };
                                                    const newFields = [...fields];
                                                    newFields[index].subSections = newFields[index].subSections ? [...newFields[index].subSections, newSubSection] : [newSubSection];
                                                    add(newFields);
                                                }}
                                                icon={<PlusOutlined />}
                                            />
                                        </div>
                                        <Form.List
                                            name={[field.name, 'subSections']}
                                            rules={[
                                                {
                                                    validator: async (_, subSections) => {
                                                        if (!subSections || subSections.length < 1) {
                                                            return Promise.reject(new Error('At least one subsection is required'));
                                                        }
                                                    },
                                                },
                                            ]}
                                        >
                                            {(subFields: any, { add: addSub, remove: removeSub }) => (
                                                <>
                                                    {subFields.map((subField: any, subIndex: number) => (
                                                        <div key={subField.key} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md ml-4">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <h3 className="text-lg font-semibold">Subsection {subIndex + 1}</h3>
                                                                <Button type="link" danger onClick={() => removeSub(subField.name)}>
                                                                    <MinusCircleOutlined /> Remove Subsection
                                                                </Button>
                                                            </div>
                                                            <div className="flex items-baseline">
                                                                <div className="flex-grow">
                                                                    <Form.Item
                                                                        name={[subField.name, 'subsection']}
                                                                        rules={[{ required: true, message: 'Please input the subsection name!' }]}
                                                                    >
                                                                        <Input placeholder="Subsection Name" />
                                                                    </Form.Item>
                                                                </div>
                                                                <Form.Item
                                                                    className="mb-0"
                                                                >
                                                                    <Upload
                                                                        name="video"
                                                                        accept=".mp4"
                                                                        onChange={(info) => handleSectionUpload(info, index, subIndex)}
                                                                    >
                                                                        <Button icon={<UploadOutlined />} />
                                                                    </Upload>
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Section
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </div>
                <div className="text-center">
                    <Button type="primary" htmlType="submit" className="w-full max-w-md p-4 text-lg">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddCourse;
